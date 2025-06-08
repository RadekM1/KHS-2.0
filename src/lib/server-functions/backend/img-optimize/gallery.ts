"use server";

import sharp from "sharp";

const MAX_CONCURRENT = 3;
let currentProcessing = 0;

export const galerySharpOptim = async (file: File) => {
  while (currentProcessing >= MAX_CONCURRENT) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  currentProcessing++;
  try {
    const buffer = await file.arrayBuffer();
    const optimizedBuffer = await sharp(buffer, {
      sequentialRead: true,
      limitInputPixels: 268402689,
    })
      .rotate()
      .resize({
        width: 1300,
        withoutEnlargement: true,
        fit: "inside",
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true,
      })
      .withMetadata({ orientation: 1 })
      .toBuffer();

    const base64 = optimizedBuffer.toString("base64");

    return {
      ok: true,
      file: `data:image/jpeg;base64,${base64}`,
    };
  } catch (error) {
    console.log("Chyba při optimalizaci obrázku:", error);
    return { ok: false };
  } finally {
    currentProcessing--;
  }
};
