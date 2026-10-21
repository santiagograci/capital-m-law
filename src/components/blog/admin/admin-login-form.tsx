"use client";

import { useActionState } from "react";
import { Lock, LoaderCircle } from "lucide-react";
import { loginAction } from "@/lib/blog/actions";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-[#16345F]/10 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(22,52,95,0.35)] dark:border-white/10 dark:bg-[#0F1E35]">
        <span className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-[#16345F] text-white dark:bg-[#9BB8E0] dark:text-[#0A1526]">
          <Lock className="size-5" />
        </span>
        <h1 className="text-2xl font-bold text-[#16345F] dark:text-white">Staff access</h1>
        <p className="mt-1 text-sm text-[#706F6F] dark:text-gray-400">
          Sign in to publish and manage Capital M Law insights.
        </p>

        <form action={action} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#16345F] dark:text-gray-200">
              Staff password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              autoFocus
              className="h-12 w-full rounded-xl border border-[#16345F]/15 bg-white px-4 text-[#16345F] outline-none transition focus:border-[#9BB8E0] focus:ring-4 focus:ring-[#9BB8E0]/25 dark:border-white/10 dark:bg-[#0A1526] dark:text-white"
            />
          </div>
          {state && !state.ok && (
            <p role="alert" className="rounded-lg bg-[#C01072]/10 px-3 py-2 text-sm font-medium text-[#C01072]">
              {state.message}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#16345F] font-semibold text-white transition hover:bg-[#1E4479] disabled:opacity-60"
          >
            {pending && <LoaderCircle className="size-4 animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
