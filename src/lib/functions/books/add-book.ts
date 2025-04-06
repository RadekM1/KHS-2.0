import { toast } from "sonner";
import { sendImgToGoogle } from "../../server-functions/backend/google-cloud/google-img-transfer";
import { avatarSharpOptim } from "../../server-functions/backend/img-optimize/avatar";
import { bookInsert } from "../../server-functions/backend/books-table/add-book";

export const handleBookAdd = async (
  name: string,
  creator: string,
  onStock: boolean,
  whoRented: string,
  release: string,
  description: string,
  image: File | null,
  fetchData: () => void,
  setRowsLoading: (rowsLoading: boolean) => void,
  handleResetForm: () => void,
) => {
  let optimazedImg: string = "";
  let isImage: boolean = false;
  if (name.length <= 1) {
    toast.error("není zadán název knihy");
    return;
  }
  setRowsLoading(true);
  if (image) {
    const imgResponse = await avatarSharpOptim(image);
    if (!imgResponse.ok || !imgResponse.file) {
      toast.error("chyba při optimalizaci obrázku");
      setRowsLoading(false);
      return;
    }
    isImage = true;
    optimazedImg = imgResponse.file;
  }
  const response = await bookInsert(
    name,
    creator,
    onStock,
    whoRented,
    release,
    description,
    isImage,
  );
  if (!response.ok) {
    toast.error(response.message);
    setRowsLoading(false);
    return;
  }
  if (image && response.returnedId) {
    const imgName = `${response.returnedId}.jpg`;
    const googleResponse = await sendImgToGoogle(optimazedImg, imgName, "book");

    if (!googleResponse) {
      toast.error(
        "vyskytl se problém při nahrávání fotografií. Zkuste znovu nebo kontaktujte administrátora",
      );
      setRowsLoading(false);
      return;
    }
  }
  toast.success("Uloženo");
  fetchData();
  handleResetForm();
  setRowsLoading(false);
};
