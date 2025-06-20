"use server";

import sharp from "sharp";

sharp.cache(false);
sharp.concurrency(1);

export const avatarSharpOptim = async (file: File) => {
  try {
    let buffer = await file.arrayBuffer();
    let optimizedBuffer = await sharp(buffer)
      .resize({ width: 500 })
      .jpeg({ quality: 80 })
      .toBuffer();

    const base64 = optimizedBuffer.toString("base64");
    optimizedBuffer = Buffer.alloc(0);
    buffer = new ArrayBuffer(0);

    return {
      ok: true,
      file: `data:image/jpeg;base64,${base64}`,
    };
  } catch (error) {
    console.log("Chyba při optimalizaci obrázku:", error);
    return { ok: false };
  }
};
