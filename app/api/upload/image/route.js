import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 },
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, and WebP are allowed" },
        { status: 400 },
      );
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey) {
      return NextResponse.json(
        { error: "ImageKit not configured" },
        { status: 500 },
      );
    }

    const body = new FormData();
    body.append("file", file);
    body.append("fileName", `found-${Date.now()}-${file.name}`);

    const uploadRes = await fetch(IMAGEKIT_UPLOAD_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString("base64")}`,
      },
      body,
    });

    const data = await uploadRes.json();

    if (!uploadRes.ok) {
      return NextResponse.json(
        { error: data.message || "Image upload failed" },
        { status: uploadRes.status },
      );
    }

    return NextResponse.json({ url: data.url, fileId: data.fileId });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
