"use server";
import { getBucket } from "@/src/lib/connection-adapters/googleStorage";

export const imagesToGoogle = async (imgNameToGoogle: string) => {
  try {
    const contentType = "image/jpeg";
    //const timestamp = new Date().getTime();
    const fullFileName = `img-gallery/${imgNameToGoogle}`;
    const bucket = getBucket();
    const file = bucket.file(fullFileName);
    const url = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 10 * 60 * 1000,
      contentType,
    });
    return url;
  } catch (error) {
    console.error("Failed to generate signed URL:", error);
    return;
  }
};
