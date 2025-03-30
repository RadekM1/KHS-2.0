"use server";

import { googleUrlSign } from "@/src/lib/server-functions/backend/google-cloud/google-url-sign";

export const sendImgToGoogle = async (
  base64: string,
  fileName: string,
  target: string,
) => {
  try {
    const signedUrl = await googleUrlSign(fileName, target);

    if (!signedUrl.ok || !signedUrl.url) {
      return { ok: false, message: "chybí podepsané URL" };
    }

    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    const uploadResponse = await fetch(String(signedUrl.url), {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: buffer,
    });

    if (!uploadResponse.ok) {
      return { ok: false, message: "nepodařilo se nahrát obrázek do cloudu" };
    }
    return { ok: true, message: "fotka avataru byla uložena do cloudu" };
  } catch (error) {
    console.log("Failed to upload image:", error);
    return { ok: false, message: "nepodařilo se nahrát obrázek do cloudu" };
  }
};
