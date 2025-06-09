"use client";

import { CiWarning } from "react-icons/ci";
import { SpinnerBigOrange } from "../spinners/spinnerBigOrange";
import { FcPicture } from "react-icons/fc";

interface DropEvent extends React.DragEvent<HTMLDivElement> {
  dataTransfer: DataTransfer;
}

interface DropZoneProps {
  handleDrop: (e: DropEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgResize: boolean;
}

export const DropZone = ({
  handleDrop,
  handleFileChange,
  imgResize,
}: DropZoneProps) => {
  return (
    <>
      <div
        className="relative my-6 w-full"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="dropzone"
          className="peer hidden"
          accept=".gif,.jpg,.png,.jpeg"
          multiple
          onChange={handleFileChange}
        />
        <label
          htmlFor="dropzone"
          className="flex cursor-pointer flex-col items-center gap-6 rounded border border-dashed dark:bg-gray-800 bg-slate-50 border-slate-300 px-6 py-10 text-center"
        >
          <span className="inline-flex h-12 items-center justify-center self-center rounded bg-slate-100/70 px-3 text-slate-400">
            <FcPicture />
          </span>

          {!imgResize ? (
            <p className="flex flex-grow w-full flex-col py-10 items-center justify-center gap-1 text-sm">
              <span className="text-orange-500 text-2xl hover:text-orange-500">
                Nahrát fotografie
              </span>
              <span className="text-slate-500 mt-3 w-full">
                Fotky nahrajte kliknutím nebo přetáhnutím do vyhrazené oblasti
              </span>
              <span className="text-slate-500 mt-3">
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  max 13 MB fotka
                </span>{" "}
                (PNG, JPG, JPEG)
              </span>
              <span className="text-orange-600 mt-3 font-semibold dark:text-orange-400">
                {" "}
                Najednou lze nahrát max 20 fotek
              </span>
            </p>
          ) : (
            <div className="flex items-center align-center flex-col">
              <p className="text-orange-500 mb-4">Optimalizace obrázků</p>
              <SpinnerBigOrange />
            </div>
          )}
        </label>
      </div>
      <div className=" text-orange-500 justify-center my-5 flex flex-col md:flex-row text-sm">
        <CiWarning className="text-orange-500 w-8 mr-2 md:mb-2 items-center self-center h-8" />
        <span className="aling-center self-center">
          Kliknutím na jednu z fotografií zvolíte která se bude zobrazovat jako
          náhledová v menu článků (objeví se oranžový rámeček)
        </span>
      </div>
    </>
  );
};
