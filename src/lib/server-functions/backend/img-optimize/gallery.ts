"use server";

import sharp from "sharp";

sharp.cache({ files: 0, items: 0 });
sharp.concurrency(1);

export const galerySharpOptim = async (file: File) => {
  let base64 = "";
  try {
    let buffer = await file.arrayBuffer();
    let optimizedBuffer = await sharp(buffer, {
      sequentialRead: true,
      limitInputPixels: 268402689,
    })
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
    optimizedBuffer = Buffer.alloc(0);
    buffer = new ArrayBuffer(0);
    return {
      ok: true,
      file: `data:image/jpeg;base64,${base64}`,
    };
  } catch (error) {
    console.log("Chyba při optimalizaci obrázku:", error);
    return { ok: false };
  } finally {
    base64 = "";
  }
};
