import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Minimal staff authentication for the blog admin.
 *
 * Password-based (BLOG_ADMIN_PASSWORD) with an HMAC-signed, httpOnly session
 * cookie (BLOG_SESSION_SECRET). Good enough for a small firm's staff panel;
 * swap for Auth.js / Clerk / Entra ID when you need per-user accounts.
 */

const COOKIE_NAME = "capm_blog_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8h working day

function getSecret(): string {
  const secret = process.env.BLOG_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("BLOG_SESSION_SECRET must be set (min. 32 chars). See .env.example");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.BLOG_ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare HMACs so lengths always match (no length leak).
  return safeEqual(sign(`pw:${candidate}`), sign(`pw:${expected}`));
}

export async function createSession(): Promise<void> {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `staff.${expires}`;
  const store = await cookies();
  store.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return false;
  const lastDot = value.lastIndexOf(".");
  if (lastDot < 0) return false;
  const payload = value.slice(0, lastDot);
  const signature = value.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload))) return false;
  const expires = Number(payload.split(".")[1]);
  return Number.isFinite(expires) && expires > Date.now() / 1000;
}

/** Guard for Server Actions — throws so unauthorized calls never mutate data. */
export async function requireStaff(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }
}
