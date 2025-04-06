"use client";

import { ReadyToUploadFilesSchema } from "@/src/schemas/queries/articles";
import { AllInGallerySchema } from "@/src/schemas/gallery";
import { handleNewsGoogleUpload } from "../articles/handle-news-google-upload";
import { toast } from "sonner";
import { editArticleNews } from "../../server-functions/backend/news/edit-news";

export const handleNewsChange = async (
  idToEdit: number,
  title: string,
  editorContent: string,
  readyToUploadFiles: ReadyToUploadFilesSchema[],
  setLoading: (loading: boolean) => void,
  setEditActive: (editActive: boolean) => void,
  handleResetForm: () => void,
  textFromEditor: string,
  active: boolean,
  allInGallery: AllInGallerySchema,
  account: string,
) => {
  if (!title || !editorContent) {
    toast.error("není zadán jeden ze tří parametrů: (titulek, článek)");
    return;
  }

  if (!idToEdit || active === undefined) {
    toast.error(
      "chyba při ukládání parametrů článku které se mají generovat automaticky (identifikátor článku nebo jestli je novinka aktivní), zkuste ještě jednou, případně kontaktujte administrátora.",
    );
    return;
  }

  if (allInGallery && allInGallery.length > 30) {
    toast.error(
      "maximální počet obrázků v galerii je 30, dle uvážení některé odeberte",
    );
    return;
  }

  const summary = `${textFromEditor.slice(0, 150)}...`;
  setLoading(true);

  setLoading(true);
  const response = await editArticleNews(
    idToEdit,
    title,
    editorContent,
    account,
    summary,
    allInGallery,
    active,
  );

  if (!response.ok) {
    setLoading(false);
    toast.error(response.message);
    return;
  }
  if (readyToUploadFiles.length > 0) {
    const googleResponse = await handleNewsGoogleUpload(
      idToEdit,
      readyToUploadFiles,
    );
    if (!googleResponse) {
      toast.error(
        "vyskytl se problém při nahrávání fotografií. Zkuste znovu nebo kontaktujte administrátora",
      );
      setLoading(false);
      return;
    }
  }
  toast.success("Článek aktualizován");
  setEditActive(false);
  setLoading(false);
  handleResetForm();
};
