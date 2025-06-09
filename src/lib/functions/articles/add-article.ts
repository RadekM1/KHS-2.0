import { ReadyToUploadFilesSchema } from "@/src/schemas/queries/articles";
import { articleInsert } from "../../server-functions/backend/articles/insert-article";
import { toast } from "sonner";
import { handleGoogleUpload } from "./handle-google-upload";

export const handleAddArticle = async (
  title: string,
  category: string,
  editorContent: string,
  slug: string,
  account: string,
  description: string,
  nickName: string,
  readyToUploadFiles: ReadyToUploadFilesSchema[],
  thumbnail: string,
  setLoading: (loading: boolean) => void,
  setEditActive: (editActive: boolean) => void,
  handleResetForm: () => void,
) => {
  let tempThumb = thumbnail;
  if (!title || !category || !editorContent) {
    toast.error(
      "není zadán jeden ze tří parametrů: (titulek, kategorie, článek)",
    );
    return;
  }

  if (!slug || !account || !description || !nickName) {
    toast.error(
      "chyba při ukládání parametrů článku které se mají generovat automaticky (odkaz, účet, popis nebo přezdívka), zkuste znovu, případně kontaktujte administrátora.",
    );
    return;
  }

  if (readyToUploadFiles.length < 1) {
    const proceed = confirm("nejsou nahrány žádné fotografie, pokračovat bez?");
    if (!proceed) {
      return;
    }
  }

  if (
    readyToUploadFiles.length > 0 &&
    !thumbnail &&
    readyToUploadFiles[0]?.file
  ) {
    const proceed = confirm(
      "nebyl vybrát náhledový obrázek, pokud budete pokračovat vybere se první v pořádí",
    );
    if (!proceed) {
      return;
    }
    tempThumb = readyToUploadFiles[0].file;
  }

  if (readyToUploadFiles && readyToUploadFiles.length > 20) {
    toast.error(
      "maximální počet obrázků v galerii je 20, dle uvážení některé odeberte",
    );
    setLoading(false);
    return;
  }

  if (readyToUploadFiles.length > 0 && !tempThumb) {
    tempThumb = readyToUploadFiles[0].file;
  }

  const metadataToApi = readyToUploadFiles.map(
    ({ file, alt, description }) => ({ file, description, alt }),
  );
  setLoading(true);
  const response = await articleInsert(
    slug,
    title,
    editorContent,
    account,
    description,
    tempThumb,
    metadataToApi,
    category,
    nickName,
  );
  if (!response.ok) {
    toast.error(response.message);
    setLoading(false);
    return;
  }
  const returnedSlug = response.slug;

  setEditActive(false);
  handleResetForm();
  if (readyToUploadFiles.length > 0 && returnedSlug) {
    const googleResponse = await handleGoogleUpload(
      returnedSlug,
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
  toast.success("Uloženo");
  setLoading(false);
};
