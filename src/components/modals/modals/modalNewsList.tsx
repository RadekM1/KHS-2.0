"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { NewsTable } from "../../tables/news-table";
import { ArticleGallerySchema } from "@/src/schemas/queries/articles-dashboard";

interface ModalArticleListProps {
  open: boolean;
  setIdToEdit: (id: number) => void;
  setOpen: (open: boolean) => void;
  setTitle: (title: string) => void;
  setGallery: (gallery: ArticleGallerySchema) => void;
  setEditActive: (active: boolean) => void;
  setEditorContent: (content: string) => void;
  setActive: (active: boolean) => void;
}

export const ModalNewsList = ({
  open,
  setIdToEdit,
  setOpen,
  setTitle,
  setEditActive,
  setEditorContent,
  setActive,
  setGallery,
}: ModalArticleListProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="mx-5 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 md:mx-10 lg:mx-32">
          <DialogPanel className="relative w-full max-w-none transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-900 sm:my-8">
            <div className="bg-white px-4 pb-4 pt-5 dark:bg-gray-800 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <NewsTable
                  setIdToEdit={setIdToEdit}
                  setTitle={setTitle}
                  setEditActive={setEditActive}
                  setEditorContent={setEditorContent}
                  setActive={setActive}
                  setOpen={setOpen}
                  setGallery={setGallery}
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 dark:bg-gray-800 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-900 dark:bg-orange-800 sm:mt-0 sm:w-auto"
              >
                Zavřít
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
