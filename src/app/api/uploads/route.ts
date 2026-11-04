import { NextResponse } from "next/server";
import { saveMediaUpload } from "@/lib/media-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const contentType = request.headers.get("content-type") || "";
    let file: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const formFile = formData.get("file");
      if (formFile instanceof File) {
        file = formFile;
      }
    } else {
      const { searchParams } = new URL(request.url);
      const filename =
        searchParams.get("filename") ||
        request.headers.get("x-filename") ||
        "upload.jpg";
      const blob = await request.blob();
      if (blob.size > 0) {
        file = new File([blob], filename, {
          type: blob.type || "application/octet-stream",
        });
      }
    }

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo para subir." },
        { status: 400 },
      );
    }

    const url = await saveMediaUpload(file);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("[uploads/route] Error al guardar el archivo localmente:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Error interno al guardar el archivo.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
