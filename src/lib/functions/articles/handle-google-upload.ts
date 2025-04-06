import { sendGalleryToGoogle } from "../../server-functions/backend/google-cloud/google-gallery-transfer";
import { ReadyToUploadFilesSchema } from "@/src/schemas/queries/articles";
import { toast } from "sonner";

export const handleGoogleUpload = async (
  slug: string,
  readyToUploadFiles: ReadyToUploadFilesSchema[],
) => {
  let uploadPromises = [];

  if (!readyToUploadFiles || readyToUploadFiles.length === 0) {
    toast.error("Nejsou připravené žádné soubory k nahrání.");
    return false;
  }
  uploadPromises = readyToUploadFiles.map(async (fileObj) => {
    const imgNameToGoogle = `${slug}/${fileObj.file}`;
    const response = sendGalleryToGoogle(
      fileObj.preview,
      imgNameToGoogle,
      "gallery",
    );
    if (!(await response).ok) {
      return false;
    }
    return true;
  });
  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults.every((result) => result === true);
};
