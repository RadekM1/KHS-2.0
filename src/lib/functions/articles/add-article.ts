import { ReadyToUploadFilesSchema } from "@/src/schemas/queries/articles";
import { articleInsert } from "../../server-functions/backend/articles/insert-article";
import { toast } from "sonner";
import { handleGoogleUpload } from "./handle-google-upload";
import { AllInGallerySchema } from "@/src/schemas/gallery";

export const handleAddArticle = async (
    title:string, 
    category:string,
    editorContent:string,
    slug:string,
    account:string,
    description:string,
    nickName:string,
    readyToUploadFiles:ReadyToUploadFilesSchema[],
    thumbnail: string, 
    setThumbnail: (thumbnail:string)=>void, 
    setLoading: (loading: boolean)=>void,
    allInGallery: AllInGallerySchema,
    setEditActive: (editActive: boolean)=>void,
    handleResetForm: ()=>void,
) => {
    if (!title || !category || !editorContent) {
      alert("není zadán jeden ze tří parametrů: (titulek, kategorie, článek)");
      return;
    }

    if (!slug || !account || !description || !nickName) {
      alert(
        "chyba při ukládání parametrů článku které se mají generovat automaticky (odkaz, účet, popis nebo přezdívka), zkuste znovu, případně kontaktujte administrátora.",
      );
      return;
    }

    if (readyToUploadFiles.length < 1) {
      const proceed = confirm(
        "nejsou nahrány žádné fotografie, pokračovat bez?",
      );
      if (!proceed) {
        return;
      }
    }

    if (readyToUploadFiles.length > 0 && !thumbnail) {
      const proceed = confirm(
        "nebyl vybrát náhledový obrázek, pokud budete pokračovat vybere se první v pořádí",
      );
      if (!proceed) {
        return;
      }
    }
    
    if (allInGallery && allInGallery.length > 30) {
      toast.error(
        "maximální počet obrázků v galerii je 30, dle uvážení některé odeberte",
      );
      setLoading(false);
      return;
    }

    if (readyToUploadFiles.length > 0 && !thumbnail && allInGallery[0]?.file) {
      setThumbnail(allInGallery[0].file);
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
      thumbnail,
      metadataToApi,
      category,
      nickName,
    )
    if(!response.ok){
      toast.error(response.message)
      setLoading(false)
      return
    }
      const returnedSlug = response.slug;

      setEditActive(false);
      handleResetForm();
      if (readyToUploadFiles.length > 0 && returnedSlug) {
        const googleResponse = await handleGoogleUpload(returnedSlug, readyToUploadFiles);
        
        if (!googleResponse) {
          toast.error("vyskytl se problém při nahrávání fotografií. Zkuste znovu nebo kontaktujte administrátora");
          setLoading(false)
          return
        } 
        toast.success('Uloženo')
      }
      setLoading(false);
  };