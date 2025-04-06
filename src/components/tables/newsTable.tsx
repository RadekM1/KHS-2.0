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
import { getNews } from "@/src/lib/server-functions/backend/news/get-news";
import { toast } from "sonner";
import { NewsArticlesSchema } from "@/src/schemas/queries/news";
import { newsArticlesColumn } from "@/src/static-objects/table-columns/newsArticles";
import { deleteNewsArticle } from "@/src/lib/server-functions/backend/news/delete-news";
import { ArticleGallerySchema } from "@/src/schemas/queries/articles-dashboard";
import { FaPowerOff } from "react-icons/fa6";

interface NewsTableProps {
  setTitle: (title: string) => void;
  setIdToEdit: (id: number) => void;
  setEditActive: (active: boolean) => void;
  setEditorContent: (content: string) => void;
  setActive: (active: boolean) => void;
  setOpen: (open: boolean) => void;
  setGallery: (gallery: ArticleGallerySchema) => void;
}
interface SearchChangeEvent {
  target: {
    value: string;
  };
}

export const NewsTable = ({
  setTitle,
  setIdToEdit,
  setEditActive,
  setEditorContent,
  setActive,
  setOpen,
  setGallery,
}: NewsTableProps) => {
  const [rows, setRows] = useState<NewsArticlesSchema>([]);
  const [sortingColumn, setsortingColumn] = useState('');
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const [rowsLoading, setRowsLoading] = useState(false);

  const HandleReset = () => {
    setSearchField("");
    setFilteredRows(rows);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRowsLoading(true);
    const response = await getNews();
    if (!response.ok) {
      toast.error(response.message);
      setRowsLoading(false);
      return;
    }
    setRows(response.rows);
    setRowsLoading(false);
  };

  const handleDel = async (id: number) => {
    const confirmDel = confirm(`opravdu chcete smazat produkt č. ${id} ?`);
    if (!confirmDel) {
      return;
    }
    const response = await deleteNewsArticle(id);
    if (!response.ok) {
      toast.error(response.message);
      setRowsLoading(false);
      return;
    }
    toast.success(response.message)
    fetchData();
    setRowsLoading(false);
  }

  const rowsPerPage = 10;

  useEffect(() => {
    const filter = rows.filter((row) => {
      const keys = Object.keys(row);
      const fulltextTrue = keys.some((key) =>
        String((row as Record<string, unknown>)[key])
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



  const handleChange = (event: SearchChangeEvent): void => {
    setSearchField(event.target.value);
  };

  const handleNewsPropsEdit = (idNewsToEdit:number) => {
    const tempId = idNewsToEdit;
    const tempRow = rows.find((row) => row.id === tempId);
    if (!tempRow) {
      toast.error("Článek nenalezen");
      return;
    }
    setTitle(tempRow.title);
    setEditorContent(tempRow.clanek);
    setActive(tempRow.isActive);
    setEditActive(true);
    setOpen(false);
    setIdToEdit(tempId);
    setGallery(tempRow.gallery ?? [])
  }

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
            columns={newsArticlesColumn}
            handleSorting={handleSorting}
            sortingColumn={sortingColumn}
            sortingOrder={sortingOrder}
          />
          <tbody>
            {paginatedRows.map((row) => (
              <React.Fragment key={row.id}>
                <tr className="dark:hover:bg-gray border-b text-start text-xs odd:bg-white even:bg-zinc-100 hover:bg-gray-50 dark:bg-gray-300 dark:text-white dark:even:bg-gray-200 md:text-sm">
                  <td className="max-w whitespace-normal border-[1px] border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    {row.title}
                  </td>

                  <td className="max-w whitespace-normal border-[1px] border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    {row.account}
                  </td>

                  <td className="max-w whitespace-normal border-[1px] border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    {new Date(row.created_time).toLocaleString()}
                  </td>

                  <td className={`max-w whitespace-normal ${row.active ? 'text-green-500' : 'text-red-500'} border-[1px] text-center border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm`}>
                    {row.active ? 'ano' : 'ne'}
                  </td>

                  <td className="max-w whitespace-normal border-[1px] border-gray-300 py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    {!rowsLoading ? (
                      <button
                        disabled={rowsLoading}
                        onClick={() => handleDel(row.id)}
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
                      onClick={() => handleNewsPropsEdit(row.id)}
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
