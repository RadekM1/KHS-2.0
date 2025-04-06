import { toast } from "sonner";
import { sendImgToGoogle } from "../../server-functions/backend/google-cloud/google-img-transfer";
import { avatarSharpOptim } from "../../server-functions/backend/img-optimize/avatar";
import { bookEdit } from "../../server-functions/backend/books-table/edit.book";

export const handleBookEdit = async (
  id: number,
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
  editBookImgExist: boolean,
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

  const saveImgUrlToSql = editBookImgExist || isImage ? true : false;

  const response = await bookEdit(
    id,
    name,
    creator,
    onStock,
    whoRented,
    release,
    description,
    saveImgUrlToSql,
  );
  if (!response.ok) {
    toast.error(response.message);
    setRowsLoading(false);
    return;
  }

  if (image) {
    const imgName = `${id}.jpg`;

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
