"use server";

import { googleUrlSign } from "@/src/lib/server-functions/backend/google-cloud/google-url-sign";
import axios from "axios";

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

    let base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    let buffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    const uploadResponse = await axios.put(String(signedUrl.url), buffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });

    base64Data = "";
    buffer = new Uint8Array(0);

    if (uploadResponse.status !== 200) {
      return { ok: false, message: "nepodařilo se nahrát obrázek do cloudu" };
    }
    return { ok: true, message: "obrázek byl uložen do cloudu" };
  } catch (error) {
    console.log("Nepodařil se upload fotky:", error);
    return { ok: false, message: "nepodařilo se nahrát obrázek do cloudu" };
  }
};
