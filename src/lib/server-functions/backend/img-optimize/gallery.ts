"use server";

import sharp from "sharp";

sharp.cache({
  memory: 20,
  files: 5,
  items: 10,
});
sharp.concurrency(1);

export const galerySharpOptim = async (file: File) => {
  let buffer = null;
  let optimizedBuffer = null;
  let sharpInstance = null;

  try {
    buffer = Buffer.from(await file.arrayBuffer());

    sharpInstance = sharp(buffer, {
      sequentialRead: true,
      limitInputPixels: 268402689,
      failOnError: false,
      density: 72,
      pages: 1,
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
      .toBuffer({ resolveWithObject: false });

    const base64 = optimizedBuffer.toString("base64");

    return {
      ok: true,
      file: `data:image/jpeg;base64,${base64}`,
    };
  } catch (error) {
    console.log("Chyba při optimalizaci obrázku:", error);
    return { ok: false };
  } finally {
    if (sharpInstance) {
      sharpInstance.destroy();
      sharpInstance = null;
    }
    if (optimizedBuffer) {
      optimizedBuffer = null;
    }
    if (buffer) {
      buffer = null;
    }
    if (global.gc) {
      global.gc();
    }
    clearSharpCache();
  }
};

export const clearSharpCache = async () => {
  sharp.cache(false);
  sharp.cache({ memory: 20, files: 5, items: 10 });

  if (global.gc) {
    global.gc();
  }

  return { status: "Sharp cache cleared" };
};
