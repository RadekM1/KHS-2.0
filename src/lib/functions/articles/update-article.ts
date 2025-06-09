"use client";

import { ReadyToUploadFilesSchema } from "@/src/schemas/queries/articles";
import { AllInGallerySchema } from "@/src/schemas/gallery";
import { handleGoogleUpload } from "./handle-google-upload";
import { toast } from "sonner";
import { editArticle } from "../../server-functions/backend/articles/edit-article";

export const handleArticleChange = async (
  idToEdit: number,
  title: string,
  category: string,
  editorContent: string,
  slug: string,
  description: string,
  readyToUploadFiles: ReadyToUploadFilesSchema[],
  thumbnail: string,
  setLoading: (loading: boolean) => void,
  allInGallery: AllInGallerySchema,
  setEditActive: (editActive: boolean) => void,
  handleResetForm: () => void,
  editedArticleSlug: string,
) => {
  let newThumbnail = thumbnail;
  setLoading(true);

  if (!title || !category || !editorContent) {
    toast.error(
      "není zadán jeden ze tří parametrů: (titulek, kategorie, článek)",
    );
    setLoading(false);
    return;
  }

  if (!description || !slug) {
    toast.error(
      "chyba při ukládání parametrů článku které se mají generovat automaticky (popisek z textu na hlavní stránku, identifikátor úpravy), zkuste ještě jednou, případně kontaktujte administrátora.",
    );
    setLoading(false);
    return;
  }

  if (allInGallery.length < 1) {
    const proceed = confirm("nejsou nahrány žádné fotografie, pokračovat bez?");
    if (!proceed) {
      setLoading(false);
      return;
    }
  }

  if (allInGallery.length > 0 && !thumbnail) {
    const proceed = confirm(
      "nebyl vybrať náhledový obrázek, pokud budete pokračovat vybere se první v pořádí",
    );
    if (!proceed) {
      setLoading(false);
      return;
    }
    if (allInGallery[0]?.file) {
      newThumbnail = allInGallery[0].file;
    }
  }

  if (readyToUploadFiles.length > 20) {
    toast.error(
      "Ke článku lze najednou nahrát pouze 20 fotografií. Zkuste postupně (nahrát, upravit, uložit).",
    );
    setLoading(false);
    return;
  }

  if (allInGallery && !newThumbnail) {
    newThumbnail = allInGallery[0].file;
  }

  if (allInGallery && allInGallery.length > 100) {
    toast.error(
      "maximální počet obrázků v galerii je 100, dle uvážení některé odeberte",
    );
    setLoading(false);
    return;
  }
  const tempThumbnail =
    newThumbnail ?? "https://storage.googleapis.com/khs-zlin/logo.svg";
  const gallery = JSON.stringify(allInGallery);

  const response = await editArticle(
    idToEdit,
    title,
    slug,
    editorContent,
    description,
    tempThumbnail,
    gallery,
    category,
  );

  if (!response.ok) {
    setLoading(false);
    toast.error(response.message);
    return;
  }
  if (readyToUploadFiles.length > 0) {
    const googleResponse = await handleGoogleUpload(
      editedArticleSlug,
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
