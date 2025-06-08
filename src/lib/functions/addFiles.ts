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

export const addFiles = async (
  newFiles: File[],
  setImgResize: SetImgResizeFunction,
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>,
  files: FileWithPreview[],
): Promise<void> => {
  const maxFileSize: number = 8 * 1024 * 1024;
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
      `Následující soubory byly odmítnuty, protože přesahují limit 8 MB: ${rejectedFiles.join(", ")}`,
    );
  }

  let processedCount = 0;
  const totalFiles = filteredFiles.length;

  for (const file of filteredFiles) {
    processedCount++;

    try {
      toast.loading(
        `Optimalizuji ${processedCount}/${totalFiles}: ${file.name}`,
        {
          id: `optimize-progress`,
        },
      );

      const response = await galerySharpOptim(file);

      toast.dismiss(`optimize-progress`);

      if (!response.ok || !response.file) {
        toast.error(`Nepodařila se optimalizace souboru: ${file.name}`);
        continue;
      }

      const optimizedPreview: string = response.file;

      setFiles((prevFiles: FileWithPreview[]) => [
        ...prevFiles,
        {
          name: file.name,
          preview: optimizedPreview,
        } as FileWithPreview,
      ]);
    } catch (error) {
      toast.dismiss(`optimize-progress`);
      toast.error(
        `Chyba při optimalizaci ${file.name}: ${error instanceof Error ? error.message : "Neznámá chyba"}`,
      );
      console.error("Chyba při optimalizaci:", error);
    }

    if (processedCount < totalFiles) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  setImgResize(false);

  if (processedCount > 0) {
    toast.success(
      `🎉 Hotovo! Optimalizováno ${processedCount} z ${totalFiles} obrázků`,
    );
  }
};
