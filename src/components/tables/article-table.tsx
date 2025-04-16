"use client";

import React, { useEffect, useState } from "react";
import { TableFooter } from "./table-footer";
import ArraySort from "@/src/lib/functions/arraySort";
import { SearchField } from "../ui/inputs/search-field-controled";
import { ResetBtn } from "../btns/resetBtn";
import { MdDeleteForever } from "react-icons/md";
import { LinearProgressBar } from "../spinners/linear";
import { CiEdit } from "react-icons/ci";
import { SpinnerSmallOrange } from "../spinners/spinnerSmallOrange";
import { TableHead } from "./table-head";
import { toast } from "sonner";
import { getArticles } from "@/src/lib/server-functions/backend/articles/get-articles";
import { ArticlesBackendSchema } from "@/src/schemas/queries/articles-dashboard";
import { ArticleGallerySchema } from "@/src/schemas/queries/articles-dashboard";
import { articlesColumn } from "@/src/static-objects/table-columns/articles";
import { deleteArticle } from "@/src/lib/server-functions/backend/articles/delete-article";

interface ArticleTableProps {
  setTitle: (title: string) => void;
  setThumbnail: (thumbnail: string) => void;
  setGallery: (gallery: ArticleGallerySchema) => void;
  setCategory: (category: string) => void;
  setEditedArticleSlug: (slug: string) => void;
  setIdToEdit: (id: number) => void;
  setEditActive: (active: boolean) => void;
  setEditorContent: (content: string) => void;
  setOpen: (open: boolean) => void;
  clearance: string;
  account: string;
}

interface SearchFieldChangeEvent {
  target: {
    value: string;
  };
}

export const ArticleTable = ({
  setTitle,
  setThumbnail,
  setGallery,
  setCategory,
  setEditedArticleSlug,
  setIdToEdit,
  setEditActive,
  setEditorContent,
  setOpen,
  clearance,
  account,
}: ArticleTableProps) => {
  const [rows, setRows] = useState<ArticlesBackendSchema>([]);
  const [sortingColumn, setsortingColumn] = useState<string>("");
  const [sortingOrder, setSortingOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchField, setSearchField] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<ArticlesBackendSchema>(rows);
  const [rowsLoading, setRowsLoading] = useState<boolean>(false);

  const HandleReset = () => {
    setSearchField("");
    setFilteredRows(rows);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRowsLoading(true);
    const response = await getArticles(clearance, account);
    if (!response.ok) {
      toast.error(response.message);
      setRowsLoading(false);
      return;
    }
    setRows(response.rows);
    setRowsLoading(false);
  };

  const handleDel = async (id: number) => {
    const confirmDel = confirm(`opravdu chcete smazat článek č. ${id} ?`);
    if (!confirmDel) {
      return;
    }
    const response = await deleteArticle(id);
    if (!response.ok) {
      toast.error(response.message);
      setRowsLoading(false);
      return;
    }
    toast.success(response.message);
    fetchData();
    setRowsLoading(false);
  };

  const rowsPerPage = 10;

  useEffect(() => {
    const filter = rows.filter((row) => {
      const keys = Object.keys(row) as Array<keyof typeof row>;
      const fulltextTrue = keys.some((key) =>
        String(row[key])
          .toLowerCase()
          .includes(String(searchField.toLowerCase())),
      );
      return fulltextTrue;
    });

    setFilteredRows(filter);

    const maxPage = Math.ceil(filter.length / rowsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [searchField, rows, currentPage]);

  const handleChange = (event: SearchFieldChangeEvent): void => {
    setSearchField(event.target.value);
  };

  const handleArticlePropsEdit = (idArticleToEdit: number) => {
    const tempId = idArticleToEdit;
    const tempRow = rows.find((row) => row.article_id === tempId);
    if (!tempRow) {
      toast.error("Článek nenalezen");
      return;
    }
    setTitle(tempRow.title);
    setEditorContent(tempRow.clanek);
    setThumbnail(tempRow.thumbnail ?? "");
    setGallery(tempRow.article_img_gallery ?? []);
    setCategory(tempRow.category);
    setEditActive(true);
    setOpen(false);
    setIdToEdit(tempId);
    setEditedArticleSlug(tempRow.slug);
  };

  const handleSorting = (key: string) => {
    if (sortingColumn === key) {
      const newOrder = sortingOrder === "asc" ? "desc" : "asc";
      setSortingOrder(newOrder);
      ArraySort(filteredRows, key, newOrder, setFilteredRows);
    } else {
      setsortingColumn(key);
      setSortingOrder("asc");
      ArraySort(filteredRows, key, "asc", setFilteredRows);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRows = filteredRows.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  return (
    <div className="w-full flex-grow bg-white dark:border-gray-400 dark:bg-zinc-400 md:border">
      {rowsLoading && <LinearProgressBar />}
      <div className="flex flex-col overflow-hidden md:flex-row">
        <div className="m-4">
          <SearchField searchField={searchField} handleChange={handleChange} />
        </div>
        <div className="flex-start m-4">
          <ResetBtn handleReset={HandleReset} />
        </div>
      </div>
      <div className="scrollbar-thumb-rounded overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-800">
        <table className="relative min-w-full overflow-auto text-xs text-gray-500 md:text-start md:text-sm">
          <TableHead
            columns={articlesColumn}
            handleSorting={handleSorting}
            sortingColumn={sortingColumn}
            sortingOrder={sortingOrder}
          />
          <tbody>
            {paginatedRows.map((row) => (
              <React.Fragment key={row.article_id}>
                <tr className="dark:hover:bg-gray border-b text-start text-xs odd:bg-white even:bg-zinc-100 hover:bg-gray-50 dark:bg-gray-300 dark:text-white dark:even:bg-gray-200 md:text-sm">
                  <td className="max-w whitespace-normal border-[1px] border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    {row.title}
                  </td>
                  <td className="max-w whitespace-normal border-[1px] border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    {row.user_email}
                  </td>
                  <td className="max-w whitespace-normal border-[1px] border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    {row.category}
                  </td>
                  <td className="max-w whitespace-normal border-[1px] border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    {row.created_time.toISOString().split("T")[0]}
                  </td>
                  <td className="max-w whitespace-normal border-[1px] border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    {!rowsLoading ? (
                      <button
                        disabled={rowsLoading}
                        onClick={() => handleDel(row.article_id)}
                      >
                        <MdDeleteForever
                          className={`h-7 w-7 hover:cursor-pointer ${
                            rowsLoading
                              ? "text-red-200 dark:text-red-800"
                              : "text-red-500"
                          }`}
                        />
                      </button>
                    ) : (
                      <SpinnerSmallOrange />
                    )}
                  </td>

                  <td className="max-w whitespace-normal border-[1px] border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    <button
                      disabled={rowsLoading}
                      onClick={() => handleArticlePropsEdit(row.article_id)}
                    >
                      <CiEdit
                        className={`h-7 w-7 hover:cursor-pointer ${
                          rowsLoading
                            ? "text-orange-200 dark:text-orange-800"
                            : "text-orange-600"
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <TableFooter
        filteredRows={filteredRows}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
