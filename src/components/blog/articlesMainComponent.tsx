"use client";

import { ArticleSimpleEditor } from "./articleSimpleEditor";
import { useState, useEffect } from "react";
import { ModalArticleList } from "../modals/modals/modalArticleList";
import { CiViewList } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import slugify from "slugify";
import { useSessionContext } from "@/src/context/session-provider";
import { SpinnerSmallWhite } from "../spinners/spinnerSmallWhite";
import { addFiles } from "@/src/lib/functions/addFiles";
import { ArticleGallerySchema } from "@/src/schemas/queries/articles-dashboard";
import { ReadyToUploadFilesSchema } from "@/src/schemas/queries/articles";
import { handleArticleChange } from "@/src/lib/functions/articles/update-article";
import { handleAddArticle } from "@/src/lib/functions/articles/add-article";
import { AllInGallerySchema } from "@/src/schemas/gallery";
import { DropZonePictures } from "./dropzone-pictures-article";
import { DropZone } from "./dropzone";

interface DropEvent extends React.DragEvent<HTMLDivElement> {
  dataTransfer: DataTransfer;
}

export default function ArticlesMainComponent() {
  const session = useSessionContext();
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [gallery, setGallery] = useState<ArticleGallerySchema>([]);
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idToEdit, setIdToEdit] = useState<number>(0);
  const [textFromEditor, setTextFromEditor] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  interface FileWithPreview extends File {
    preview: string;
    description?: string;
  }
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedGoogleImage, setSelectedGoogleImage] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [allInGallery, setAllInGallery] = useState<AllInGallerySchema>([]);
  const [readyToUploadFiles, setReadyToUploadFiles] = useState<ReadyToUploadFilesSchema[]>([]);
  const [imgResize, setImgResize] = useState(false);
  const [editedArticleSlug, setEditedArticleSlug] = useState("");

  const nickName = session?.user.nickName ?? '';
  const account = session?.user.email ?? '';

  useEffect(() => {
    interface PreventEventProps {
      preventDefault(): void;
      stopPropagation(): void;
    }

    const preventDefault = (e: PreventEventProps): void => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("dragover", preventDefault);
    document.addEventListener("drop", preventDefault);

    return () => {
      document.removeEventListener("dragover", preventDefault);
      document.removeEventListener("drop", preventDefault);
    };
  }, []);

  useEffect(() => {
    const renamedFiles = files.map((file) => {
      const fileExtension = file.name.split(".").pop();
      const fileName = file.name.replace(`.${fileExtension}`, "");
      const slugifyName = slugify(fileName, { lower: true, strict: true });
      const newFileName = `${slugifyName}.${fileExtension}`;
      const newAlt = `${file.description ? file.description : "img"}-${title}`;
      const newDescription = !file.description ? "" : file.description;

      return {
        file: newFileName,
        description: newDescription,
        alt: newAlt,
        preview: file.preview,
      };
    });

    setReadyToUploadFiles(renamedFiles);

    const tempAllInGallery = [
      ...gallery,
      ...renamedFiles.map((file) => ({
        file: `https://storage.googleapis.com/khs-zlin/img-gallery/${editedArticleSlug}/${file.file}`,
        alt: file.alt,
        description: file.description,
      })),
    ];

    setAllInGallery(tempAllInGallery);
  }, [files, gallery, title]);

  const handleDrop = (e: DropEvent): void => {
    e.preventDefault();
    const droppedFiles: File[] = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles, setImgResize, setFiles, files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;
    const selectedFiles: File[] = Array.from(e.target.files);
    addFiles(selectedFiles, setImgResize, setFiles, files);
  };

  const handleGoogleImageClick = (image:{file: string, description: string, alt: string}) => {
    setSelectedGoogleImage(image.file);
    setThumbnail(image.file);
    setSelectedFile("");
  };

  useEffect(() => {
    const generatedSlug = slugify(title, {
      lower: true,
      strict: true,
      locale: "cs",
    });
    setSlug(generatedSlug);

    const generatedDescription =
      textFromEditor.length >= 200
        ? `${textFromEditor.slice(0, 200)}...`
        : textFromEditor;
    setDescription(generatedDescription);
  }, [title, textFromEditor]);

  const onChange = (e:string, id:string) => {
    const tempE = e;
    const tempId = id;

    switch (tempId) {
      case "title":
        {
          setTitle(tempE);
        }
        break;
      case "category":
        {
          setCategory(tempE);
        }
        break;
      default:
        break;
    }
  };

  const handleResetForm = () => {
    setTitle("");
    setCategory("");
    setEditorContent("");
    setIdToEdit(0);
    setThumbnail("");
    setGallery([]);
    setDescription("");
    setSlug("");
    setReadyToUploadFiles([]);
    setSelectedGoogleImage("");
    setAllInGallery([]);
    setFiles([]);
    setSelectedFile('');
  };

  const handleAddClick = () =>{
    handleAddArticle(
      title,
      category,
      editorContent,
      slug,
      account,
      description,
      nickName,
      readyToUploadFiles,
      thumbnail,
      setThumbnail,
      setLoading,
      allInGallery,
      setEditActive,
      handleResetForm
    )
  }

  const handleEditedUploadClick = () =>{
    handleArticleChange(
      idToEdit,
      title,
      category,
      editorContent,
      slug,
      description,
      readyToUploadFiles,
      thumbnail,
      setLoading,
      allInGallery,
      setEditActive,
      handleResetForm,
      editedArticleSlug
    )
  }
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center self-center md:flex-row">
        <div className="mb-4 flex flex-col items-center self-center md:flex-row">
          {editActive && (
            <>
              <div className="max-w flex flex-row whitespace-normal border-gray-300 py-2 text-gray-800 md:mx-2 md:px-2 md:text-sm">
                <button
                  className="mx-4 flex h-10 items-center justify-center gap-2 self-center whitespace-nowrap rounded bg-green-500 px-4 font-medium tracking-wide text-white transition duration-300 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
                  disabled={loading}
                  onClick={() => handleEditedUploadClick()}
                >
                  {!loading ? <span>Aktualizovat</span> : <SpinnerSmallWhite />}
                </button>

                <button
                  disabled={loading}
                  onClick={() => {
                    setEditActive(false), handleResetForm();
                  }}
                  className="mx-4 flex h-10 items-center justify-center gap-2 self-center whitespace-nowrap rounded bg-red-500 px-4 font-medium tracking-wide text-white transition duration-300 hover:bg-red-600 focus:bg-red-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none"
                >
                  <span> Zrušit úpravy </span>
                </button>
              </div>
            </>
          )}
        </div>
        {!editActive && (
          <button
            onClick={() => handleAddClick()}
            disabled={loading}
            className="mx-2 mb-4 inline-flex h-10 min-w-[180px] items-center justify-center gap-2 whitespace-nowrap rounded bg-green-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none dark:bg-green-700 dark:hover:bg-green-800"
          >
            {!loading ? (
              <>
                <span>Uložit a publikovat</span>
                <FaSave />
              </>
            ) : (
              <SpinnerSmallWhite />
            )}
          </button>
        )}
        <div className="max-w whitespace-normal border-gray-300 py-2 text-gray-800 md:mx-2 md:px-2 md:text-sm">
          <button
            onClick={() => setOpen(true)}
            disabled={loading}
            className="mx-2 mb-4 inline-flex h-10 min-w-[180px] items-center justify-center gap-2 whitespace-nowrap rounded bg-orange-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-orange-600 focus:bg-orange-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none dark:bg-orange-700 dark:hover:bg-orange-800"
          >
            <span>Seznam článků</span>
            <ModalArticleList
              open={open}
              setIdToEdit={setIdToEdit}
              setEditedArticleSlug={setEditedArticleSlug}
              setEditActive={setEditActive}
              setGallery={setGallery}
              setThumbnail={setThumbnail}
              setCategory={setCategory}
              setTitle={setTitle}
              setEditorContent={setEditorContent}
              setOpen={setOpen}
            />
            <CiViewList />
          </button>
        </div>
      </div>
      <div className="my-2"></div>
      <div className="relative my-6 min-w-[300px]">
        <select
          onChange={(e) => onChange(e.target.value, "category")}
          required
          id="id-01"
          value={category}
          className="text-slate-7n00 peer relative h-10 w-full appearance-none rounded border border-slate-200 bg-white px-4 text-sm outline-none transition-all autofill:bg-white focus:border-orange-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 dark:border-gray-700 dark:bg-[#121212] dark:text-white"
        >
          <option
            className="dark:bg-[#121212]"
            disabled
            hidden
            value=""
          ></option>
          <option value="skaly">Skály</option>
          <option value="hory">Hory</option>
          <option value="ostatni">Ostatní</option>
          <option value="oddil">Oddíl</option>
        </select>

        <label
          htmlFor="id-01"
          className="pointer-events-none absolute left-2 top-2.5 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent dark:bg-[#121212] dark:text-white dark:before:bg-[#121212]"
        >
          Vyberte kategorii
        </label>
        <MdOutlineKeyboardArrowDown className="absolute right-2 top-2.5 h-5 w-5" />
      </div>

      <div className="my-1 mb-10 min-w-[300px] max-w-[400px] dark:bg-[#121212] dark:text-white">
        <input
          type="text"
          onChange={(e) => onChange(e.target.value, "title")}
          value={title}
          placeholder="Vyplňte titulek článku"
          disabled={loading}
          className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 dark:border-gray-700 dark:bg-[#121212] dark:text-white dark:placeholder:text-white dark:disabled:dark:bg-[#121212]"
        />
      </div>
      <div>
        <span className="my-3 pt-4 text-xl">Obsah článku</span>
      </div>
      <div className="flex w-full">
        <ArticleSimpleEditor
          editorContent={editorContent}
          setEditorContent={setEditorContent}
          setTextFromEditor={setTextFromEditor}
        />
      </div>
      <div className="my-3 flex flex-col pt-24 text-xl">
        <DropZone 
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
          imgResize={imgResize}
        />
        <DropZonePictures
          readyToUploadFiles={readyToUploadFiles}
          selectedFile={selectedFile}
          setThumbnail={setThumbnail}
          setSelectedFile={setSelectedFile}
          setSelectedGoogleImage={setSelectedGoogleImage}
          files={files}
          setFiles={setFiles}
          loading={loading}
          gallery={gallery}
          setGallery={setGallery}
          selectedGoogleImage={selectedGoogleImage}
          editActive={editActive}
          handleGoogleImageClick={handleGoogleImageClick}
        />
      </div>
    </div>
  );
}
