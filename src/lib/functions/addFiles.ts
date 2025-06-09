"use client";
import { toast } from "sonner";
import { galerySharpOptim } from "../server-functions/backend/img-optimize/gallery";

interface SetImgResizeFunction {
  (value: boolean): void;
}

interface FileWithPreview extends File {
  preview: string;
  description?: string;
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const optimizeWithRetry = async (
  file: File,
  maxRetries: number = 3,
): Promise<string | null> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await galerySharpOptim(file);

      if (response.ok && response.file) {
        return response.file;
      }
    } catch (error) {
      console.log(error);
      if (attempt < maxRetries) {
        await sleep(1000);
      }
    }
  }
  return null;
};

export const addFiles = async (
  newFiles: File[],
  setImgResize: SetImgResizeFunction,
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>,
  files: FileWithPreview[],
): Promise<void> => {
  const maxFileSize: number = 13 * 1024 * 1024;
  const maxFiles: number = 20;
  const rejectedFiles: string[] = [];
  const duplicateFiles: string[] = [];

  if (newFiles.length > maxFiles) {
    toast.error(`Nelze nahrát více než ${maxFiles} souborů najednou.`);
    return;
  }

  setImgResize(true);

  const remainingSlots: number = maxFiles - files.length;
  if (remainingSlots <= 0) {
    toast.error(`Maximální počet souborů (20) již byl nahrán.`);
    setImgResize(false);
    return;
  }

  const filesToProcess: File[] = newFiles.slice(0, remainingSlots);

  const filteredFiles: File[] = filesToProcess.filter((file) => {
    if (files.some((f: { name: string }) => f.name === file.name)) {
      duplicateFiles.push(file.name);
      return false;
    }
    if (file.size > maxFileSize) {
      rejectedFiles.push(file.name);
      return false;
    }
    return true;
  });

  if (duplicateFiles.length > 0) {
    toast.warning(
      `Následující soubory byly odmítnuty, protože již byly nahrány: ${duplicateFiles.join(", ")}`,
    );
  }

  if (rejectedFiles.length > 0) {
    toast.error(
      `Následující soubory byly odmítnuty, protože přesahují limit 13 MB: ${rejectedFiles.join(", ")}`,
    );
  }

  let processedCount = 0;
  let successCount = 0;
  const totalFiles = filteredFiles.length;

  for (const file of filteredFiles) {
    processedCount++;

    toast.loading(
      `Optimalizuji ${processedCount}/${totalFiles}: ${file.name}`,
      { id: `optimize-progress` },
    );

    const optimizedPreview = await optimizeWithRetry(file);

    toast.dismiss(`optimize-progress`);

    if (optimizedPreview) {
      setFiles((prevFiles: FileWithPreview[]) => [
        ...prevFiles,
        {
          name: file.name,
          preview: optimizedPreview,
        } as FileWithPreview,
      ]);
      successCount++;
    } else {
      toast.error(`Nepodařilo se optimalizovat ${file.name}`);
    }

    if (processedCount < totalFiles) {
      await sleep(300);
    }
  }

  setImgResize(false);

  if (successCount > 0) {
    toast.success(`🎉 Hotovo! Optimalizováno ${successCount} souborů`);
  }
};
