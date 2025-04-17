"use client";

import { ArticleSimpleEditor } from "./articleSimpleEditor";
import { useState, useEffect } from "react";
import { CiViewList } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import slugify from "slugify";
import { useSessionContext } from "@/src/context/session-provider";
import { SpinnerSmallWhite } from "../spinners/spinnerSmallWhite";
import { addFiles } from "@/src/lib/functions/addFiles";
import { ArticleGallerySchema } from "@/src/schemas/queries/articles-dashboard";
import { ReadyToUploadFilesSchema } from "@/src/schemas/queries/articles";
import { handleAddNew } from "@/src/lib/functions/news/add-new";
import { AllInGallerySchema } from "@/src/schemas/gallery";
import { DropZoneNews } from "./news/dropzone-news";
import { ModalNewsList } from "../modals/modals/modalNewsList";
import { NewsArticleInputs } from "./news-article-inputs";
import { DropZonePicturesNews } from "./news/dropzone-pictures-news";
import { handleNewsChange } from "@/src/lib/functions/news/update-news";

interface DropEvent extends React.DragEvent<HTMLDivElement> {
  dataTransfer: DataTransfer;
}

export const NewsMainComponent = () => {
  const session = useSessionContext();
  const [title, setTitle] = useState("");
  const [gallery, setGallery] = useState<ArticleGallerySchema>([]);
  const [open, setOpen] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idToEdit, setIdToEdit] = useState<number>(0);
  const [textFromEditor, setTextFromEditor] = useState("");
  interface FileWithPreview extends File {
    preview: string;
    description?: string;
  }
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedGoogleImage, setSelectedGoogleImage] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [allInGallery, setAllInGallery] = useState<AllInGallerySchema>([]);
  const [readyToUploadFiles, setReadyToUploadFiles] = useState<
    ReadyToUploadFilesSchema[]
  >([]);
  const [imgResize, setImgResize] = useState(false);
  const [active, setActive] = useState<boolean>(true);

  const account = session?.user.email ?? "";

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
        file: `https://storage.googleapis.com/khs-zlin/news-img-gallery/${idToEdit}/${file.file}`,
        alt: file.alt,
        description: file.description,
      })),
    ];

    setAllInGallery(tempAllInGallery);
  }, [files, gallery]);

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

  const handleGoogleImageClick = (image: {
    file: string;
    description: string;
    alt: string;
  }) => {
    setSelectedGoogleImage(image.file);
    setSelectedFile("");
  };

  const onChange = (e: string, id: string) => {
    const tempE = e;
    const tempId = id;

    switch (tempId) {
      case "title":
        {
          setTitle(tempE);
        }
        break;
      default:
        break;
    }
  };

  const handleResetForm = () => {
    setTitle("");
    setEditorContent("");
    setIdToEdit(0);
    setGallery([]);
    setReadyToUploadFiles([]);
    setSelectedGoogleImage("");
    setAllInGallery([]);
    setFiles([]);
    setSelectedFile("");
    setActive(true);
  };

  const handleAddClick = () => {
    handleAddNew(
      title,
      editorContent,
      account,
      readyToUploadFiles,
      setLoading,
      setEditActive,
      handleResetForm,
      textFromEditor,
      active,
    );
  };

  const handleEditedUploadClick = () => {
    handleNewsChange(
      idToEdit,
      title,
      editorContent,
      readyToUploadFiles,
      setLoading,
      setEditActive,
      handleResetForm,
      textFromEditor,
      active,
      allInGallery,
      account,
    );
  };

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
                  onClick={() => (setEditActive(false), handleResetForm())}
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
            <ModalNewsList
              open={open}
              setIdToEdit={setIdToEdit}
              setEditActive={setEditActive}
              setTitle={setTitle}
              setEditorContent={setEditorContent}
              setActive={setActive}
              setOpen={setOpen}
              setGallery={setGallery}
            />
            <CiViewList />
          </button>
        </div>
      </div>
      <NewsArticleInputs
        title={title}
        disabled={loading}
        onChange={onChange}
        active={active}
        setActive={setActive}
      />
      <div className="flex w-full">
        <ArticleSimpleEditor
          editorContent={editorContent}
          setEditorContent={setEditorContent}
          setTextFromEditor={setTextFromEditor}
        />
      </div>
      <div className="my-3 flex w-full flex-col pt-24 text-xl">
        <DropZoneNews
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
          imgResize={imgResize}
        />
        <DropZonePicturesNews
          readyToUploadFiles={readyToUploadFiles}
          selectedFile={selectedFile}
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
};
