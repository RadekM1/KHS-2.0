import { ReadyToUploadFilesSchema } from "@/src/schemas/queries/articles";
import { toast } from "sonner";
import { handleNewsGoogleUpload } from "../articles/handle-news-google-upload";
import { newsInsert } from "../../server-functions/backend/news/insert-news";

export const handleAddNew = async (
  title: string,
  editorContent: string,
  account: string,
  readyToUploadFiles: ReadyToUploadFilesSchema[],
  setLoading: (loading: boolean) => void,
  setEditActive: (editActive: boolean) => void,
  handleResetForm: () => void,
  textFromEditor: string,
  active: boolean,
) => {
  if (!editorContent) {
    toast.error("není zadán článek");
    return;
  }

  if (!account) {
    toast.error(
      "chyba při ukládání parametrů novinky jenž se mají generovat automaticky (uživatel), zkuste znovu, případně kontaktujte administrátora.",
    );
    return;
  }

  if (readyToUploadFiles && readyToUploadFiles.length > 30) {
    toast.error(
      "maximální počet obrázků v galerii je 30, dle uvážení některé odeberte",
    );
    setLoading(false);
    return;
  }

  const summary = `${textFromEditor.slice(0, 150)}...`;

  const metadataToApi = readyToUploadFiles.map(
    ({ file, alt, description }) => ({ file, description, alt }),
  );
  setLoading(true);
  const response = await newsInsert(
    title,
    editorContent,
    account,
    summary,
    metadataToApi,
    active,
  );
  if (!response.ok) {
    toast.error(response.message);
    setLoading(false);
    return;
  }
  const returnedId = response.id;

  setEditActive(false);
  handleResetForm();
  if (readyToUploadFiles.length > 0 && returnedId) {
    const googleResponse = await handleNewsGoogleUpload(
      returnedId,
      readyToUploadFiles,
    );

    if (!googleResponse) {
      toast.error(
        "vyskytl se problém při nahrávání fotografií. Zkuste znovu nebo kontaktujte administrátora",
      );
      return;
    }
  }
  toast.success("Uloženo");
  setLoading(false);
};
