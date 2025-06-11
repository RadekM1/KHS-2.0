"use server";

import sharp from "sharp";

sharp.cache({ memory: 50, files: 10, items: 20 });
sharp.concurrency(1);

export const galerySharpOptim = async (file: File) => {
  let base64 = "";
  let optimizedBuffer = null;
  let buffer;
  let sharpInstance = null;

  try {
    buffer = await file.arrayBuffer();

    sharpInstance = sharp(buffer, {
      sequentialRead: true,
      limitInputPixels: 268402689,
      failOnError: false,
    });

    optimizedBuffer = await sharpInstance
      .rotate()
      .resize({
        width: 1500,
        withoutEnlargement: true,
        fit: "inside",
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true,
      })
      .withMetadata({ orientation: 1 })
      .toBuffer();

    base64 = optimizedBuffer.toString("base64");

    optimizedBuffer = null;
    buffer = null;
    return {
      ok: true,
      file: `data:image/jpeg;base64,${base64}`,
    };
  } catch (error) {
    console.log("Chyba při optimalizaci obrázku:", error);
    return { ok: false };
  } finally {
    base64 = "";
    if (sharpInstance) {
      sharpInstance.destroy();
    }
  }
};
