"use client";

import { ReadyToUploadFilesSchema } from "@/src/schemas/queries/articles";
import OptimizedImage from "./optimizedImage";
import { useCallback, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import {
  MdDeleteForever,
  MdArrowUpward,
  MdArrowDownward,
  MdDragIndicator,
} from "react-icons/md";
import { ArticleGallerySchema } from "@/src/schemas/queries/articles-dashboard";

interface FileWithPreview extends File {
  preview: string;
  description?: string;
}

interface imageProps {
  alt: string;
  description: string;
  file: string;
}

interface DropZonePicturesProps {
  readyToUploadFiles: ReadyToUploadFilesSchema[];
  selectedFile: string;
  setThumbnail: (thumbnail: string) => void;
  setSelectedFile: (selectedFile: string) => void;
  setSelectedGoogleImage: (selectedGoogleImage: string) => void;
  files: FileWithPreview[];
  setFiles: (files: FileWithPreview[]) => void;
  loading: boolean;
  gallery: ArticleGallerySchema;
  setGallery: (gallery: ArticleGallerySchema) => void;
  selectedGoogleImage: string;
  editActive: boolean;
  handleGoogleImageClick: (image: imageProps) => void;
}

export const DropZonePictures = ({
  readyToUploadFiles,
  selectedFile,
  setThumbnail,
  setSelectedFile,
  setSelectedGoogleImage,
  files,
  setFiles,
  loading,
  gallery,
  setGallery,
  selectedGoogleImage,
  editActive,
  handleGoogleImageClick,
}: DropZonePicturesProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedGalleryIndex, setDraggedGalleryIndex] = useState<number | null>(
    null,
  );

  const handleFileClick = (file: {
    file: string;
    description: string;
    alt: string;
    preview: string;
  }) => {
    setSelectedFile(file.file);
    setThumbnail(file.file);
    setSelectedGoogleImage("");
  };

  const onCommentChange = (e: string, index: number) => {
    const tempVal = e;
    const cloneGoogleGallery = [...gallery];
    cloneGoogleGallery[index] = {
      ...cloneGoogleGallery[index],
      description: tempVal,
    };
    setGallery(cloneGoogleGallery);
  };

  const handlePictureDel = (index: number) => {
    const tempIndex = index;
    const cloneGoogleGallery = gallery.filter(
      (_, index) => index !== tempIndex,
    );
    setGallery(cloneGoogleGallery);
  };

  const onCommentDropzoneChange = useCallback(
    (e: string, index: number) => {
      const updatedFiles = files.map((file: FileWithPreview, i: number) => {
        if (i === index) {
          return {
            ...file,
            description: e,
          };
        }
        return file;
      });
      setFiles(updatedFiles);
    },
    [files],
  );

  const handleDropzonePictureDel = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= readyToUploadFiles.length) return;

    const newFiles = [...files];
    const [movedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, movedFile);
    setFiles(newFiles);
  };

  const moveGalleryImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= gallery.length) return;

    const newGallery = [...gallery];
    const [movedImage] = newGallery.splice(fromIndex, 1);
    newGallery.splice(toIndex, 0, movedImage);
    setGallery(newGallery);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newFiles = [...files];
    const draggedFile = newFiles[draggedIndex];
    newFiles.splice(draggedIndex, 1);
    newFiles.splice(dropIndex, 0, draggedFile);

    setFiles(newFiles);
    setDraggedIndex(null);
  };

  // Drag and Drop funkce pro gallery fotky
  const handleGalleryDragStart = (e: React.DragEvent, index: number) => {
    setDraggedGalleryIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleGalleryDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedGalleryIndex === null) return;

    const newGallery = [...gallery];
    const draggedImage = newGallery[draggedGalleryIndex];
    newGallery.splice(draggedGalleryIndex, 1);
    newGallery.splice(dropIndex, 0, draggedImage);

    setGallery(newGallery);
    setDraggedGalleryIndex(null);
  };

  return (
    <>
      <div className="mt-4">
        {readyToUploadFiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {readyToUploadFiles.map((file, index) => (
              <div
                key={index}
                className={`border-[1px] border-gray-300 rounded-2xl relative ${
                  draggedIndex === index ? "opacity-50" : ""
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <MdDragIndicator className="absolute top-2 right-2 text-gray-400 cursor-move z-10" />

                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  <button
                    onClick={() => moveFile(index, index - 1)}
                    disabled={index === 0 || loading}
                    className="p-1 bg-white/80 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdArrowUpward className="text-gray-600 w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveFile(index, index + 1)}
                    disabled={
                      index === readyToUploadFiles.length - 1 || loading
                    }
                    className="p-1 bg-white/80 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdArrowDownward className="text-gray-600 w-4 h-4" />
                  </button>
                </div>

                <div
                  className={`cursor-pointer p-2 rounded border ${
                    selectedFile === file.file
                      ? "border-orange-500 dark:border-orange-900 bg-orange-200 rounded-t-2xl dark:bg-orange-900 border-[1px]"
                      : "border-transparent"
                  }`}
                >
                  <OptimizedImage
                    key={index}
                    file={file}
                    selectedFile={selectedFile}
                    handleFileClick={handleFileClick}
                    index={index}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex relative items-center w-full">
                    <FaRegComment className="absolute left-3 text-gray-400" />
                    <input
                      type="text"
                      onChange={(e) =>
                        onCommentDropzoneChange(e.target.value, index)
                      }
                      value={file.description}
                      placeholder="komentář"
                      disabled={loading}
                      className="pl-10 p-1 w-full dark:bg-[#121212] dark:border-gray-700 dark:text-white rounded-b-2xl h-10 px-4 pr-12 text-sm transition-all outline-none focus-visible:outline-none peer border-slate-200 text-slate-700 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:dark:bg-[#121212] disabled:text-slate-400 placeholder:text-slate-400 dark:placeholder:text-white"
                    />
                    <MdDeleteForever
                      onClick={() => handleDropzonePictureDel(index)}
                      className="text-red-400 cursor-pointer h-6 w-6 absolute right-3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editActive && gallery && (
        <div className="mt-4">
          <h3 className="text-lg my-6 text-orange-500 font-semibold">
            Již nahrané fotky článku
          </h3>
          {gallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gallery.map((image, index) => (
                <div
                  key={index}
                  className={`border-[1px] border-gray-300 rounded-2xl relative ${
                    draggedGalleryIndex === index ? "opacity-50" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleGalleryDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleGalleryDrop(e, index)}
                >
                  <MdDragIndicator className="absolute top-2 right-2 text-gray-400 cursor-move z-10" />

                  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    <button
                      onClick={() => moveGalleryImage(index, index - 1)}
                      disabled={index === 0 || loading}
                      className="p-1 bg-white/80 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MdArrowUpward className="text-gray-600 w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveGalleryImage(index, index + 1)}
                      disabled={index === gallery.length - 1 || loading}
                      className="p-1 bg-white/80 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MdArrowDownward className="text-gray-600 w-4 h-4" />
                    </button>
                  </div>

                  <div
                    onClick={() => handleGoogleImageClick(image)}
                    className={`cursor-pointer p-2 rounded border ${
                      selectedGoogleImage === image.file
                        ? "border-orange-500 dark:border-orange-900 bg-orange-200 dark:bg-orange-900 border-[1px]"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image.file}
                      alt={image.alt || "Google gallery image"}
                      className="w-full h-72 lg:h-72 object-contain rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex relative items-center w-full">
                      <FaRegComment className="absolute left-3 text-gray-400" />
                      <input
                        type="text"
                        onChange={(e) => onCommentChange(e.target.value, index)}
                        value={image.description}
                        placeholder="komentář"
                        disabled={loading}
                        className="pl-10 p-1 w-full dark:bg-[#121212] dark:border-gray-700 dark:text-white rounded-b-2xl h-10 px-4 pr-12 text-sm transition-all outline-none focus-visible:outline-none peer border-slate-200 text-slate-700 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:dark:bg-[#121212] disabled:text-slate-400 placeholder:text-slate-400 dark:placeholder:text-white"
                      />
                      <MdDeleteForever
                        onClick={() => handlePictureDel(index)}
                        className="text-red-400 cursor-pointer h-6 w-6 absolute right-3"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
