'use client'
import { toast } from "sonner";
import { galerySharpOptim } from "../server-functions/backend/img-optimize/gallery";



interface SetFilesFunction {
  (prevFiles: FileWithPreview[]): FileWithPreview[];
}

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
  files: FileWithPreview[]
): Promise<void> => {
  setImgResize(true);
  const maxFileSize: number = 9 * 1024 * 1024;
  const maxFiles: number = 30;
  const rejectedFiles: string[] = [];
  const duplicateFiles: string[] = [];

  const remainingSlots: number = maxFiles - files.length;
  if (remainingSlots <= 0) {
    alert(`Maximální počet souborů (30) již byl nahrán.`);
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
    toast(
      `Následující soubory byly odmítnuty, protože již byly nahrány:\n${duplicateFiles.join("\n")}`,
    );
  }

  if (rejectedFiles.length > 0) {
    toast(
      `Následující soubory byly odmítnuty, protože přesahují limit 9 MB:\n${rejectedFiles.join("\n")}`,
    );
  }

  const optimizationPromises: Promise<void>[] = filteredFiles.map(async (file: File) => {
    const response = await galerySharpOptim(file);
    if (!response.ok || !response.file) {
      toast.error(`Nepodařila se optimalizace souboru: ${file.name}`);
      return;
    }
    const optimizedPreview: string = response.file;
    
    setFiles((prevFiles: FileWithPreview[]) => [
      ...prevFiles,
      {
        name: file.name,
        preview: optimizedPreview,
      } as FileWithPreview,
    ]);
  });

  await Promise.all(optimizationPromises);

  setImgResize(false);

  if (files.length >= maxFiles) {
    alert(`Byl dosažen maximální počet souborů (30).`);
  }
};
