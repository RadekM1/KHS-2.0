"use server";

import sharp from "sharp";

export const galerySharpOptim = async (file: File) => {
  try {
    const buffer = await file.arrayBuffer();
    const metadata = await sharp(buffer).metadata();
    const optimizedBuffer = await sharp(buffer)
      .rotate()
      .resize({ width: 1300 })
      .jpeg({ quality: 80 })
      .withMetadata({ orientation: metadata.orientation })
      .toBuffer();

    const base64 = optimizedBuffer.toString("base64");

    return {
      ok: true,
      file: `data:image/jpeg;base64,${base64}`,
    };
  } catch (error) {
    console.log("Chyba při optimalizaci obrázku:", error);
    return { ok: false };
  }
};
