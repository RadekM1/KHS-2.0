"use server";
import { getBucket } from "@/src/lib/connection-adapters/googleStorage";

export const googleUrlSign = async (
  imgNameToGoogle: string,
  target: string,
) => {
  try {
    const contentType = "image/jpeg";

    let fullFileName;

    if (target === "gallery") {
      fullFileName = `img-gallery/${imgNameToGoogle}`;
    }

    if (target === "news") {
      fullFileName = `news-img-gallery/${imgNameToGoogle}`;
    }

    if (target === "avatar") {
      fullFileName = `avatars/${imgNameToGoogle}`;
    }

    if (target === "book") {
      fullFileName = `books/${imgNameToGoogle}`;
    }

    if (!target) {
      throw new Error("unknow target string");
    }

    const bucket = getBucket();
    const file = bucket.file(fullFileName ?? "");
    const url = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 10 * 60 * 1000,
      contentType,
    });
    return { ok: true, url: url[0] };
  } catch (error) {
    console.log("Failed to generate signed URL:", error);
    return { ok: false, url: "" };
  }
};
