"use client";

import React, { useEffect, useState, useRef } from "react";
import { TableFooter } from "./table-footer";
import ArraySort from "@/src/lib/functions/arraySort";
import { SearchField } from "../ui/inputs/search-field-controled";
import { ResetBtn } from "../btns/resetBtn";
import { MdDeleteForever } from "react-icons/md";
import { LinearProgressBar } from "../spinners/linear";
import { CiEdit } from "react-icons/ci";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { bookColumnList } from "@/src/static-objects/table-columns/books";
import { getBooks } from "@/src/lib/server-functions/backend/books-table/get-books";
import { toast } from "sonner";
import { TableHead } from "./table-head";
import { BookRowsSchema } from "@/src/schemas/queries/tables/books-table-schema";
import { deleteBook } from "@/src/lib/server-functions/backend/books-table/delete-book";
import { handleBookAdd } from "@/src/lib/functions/books/add-book";
import { SpinnerSmallOrange } from "../spinners/spinnerSmallOrange";
import { handleBookEdit } from "@/src/lib/functions/books/edit-book";

interface SearchFieldChangeEvent {
  target: {
    value: string;
  };
}

export const BooksTable = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<BookRowsSchema>([]);
  const [sortingColumn, setsortingColumn] = useState<string>("");
  const [sortingOrder, setSortingOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchField, setSearchField] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<BookRowsSchema>(rows);
  const [rowsLoading, setRowsLoading] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [idToEdit, setIdToEdit] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [onStock, setOnStock] = useState<boolean>(false);
  const [whoRented, setWhoRented] = useState<string>("");
  const [release, setRelease] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editBookImgExist, setEditBookImgExist] = useState<boolean>(false);
  const rowsPerPage = 20;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRowsLoading(true);
    const response = await getBooks();
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
    const response = await deleteBook(id);
    if (!response.ok) {
      toast.error(response.message);
      setRowsLoading(false);
      return;
    }
    toast.success(response.message);
    fetchData();
    setRowsLoading(false);
    fetchData();
  };

  const handleSqlProductChange = async () => {
    handleBookEdit(
      idToEdit,
      name,
      creator,
      onStock,
      whoRented,
      release,
      description,
      selectedFile,
      fetchData,
      setRowsLoading,
      handleResetForm,
      editBookImgExist,
    );
  };

  const handleAdd = async () => {
    handleBookAdd(
      name,
      creator,
      onStock,
      whoRented,
      release,
      description,
      selectedFile,
      fetchData,
      setRowsLoading,
      handleResetForm,
    );
  };

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

  const HandleReset = () => {
    setSearchField("");
    setFilteredRows(rows);
  };

  const handleSorting = (key) => {
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

  const handleProductChange = (e, id) => {
    const tempE = e;
    const tempId = id;

    switch (tempId) {
      case "name":
        {
          setName(tempE);
        }
        break;
      case "creator":
        {
          setCreator(tempE);
        }
        break;
      case "onStock":
        {
          setOnStock(tempE);
        }
        break;
      case "whoRented":
        {
          setWhoRented(tempE);
        }
        break;
      case "release":
        {
          setRelease(tempE);
        }
        break;
      case "description":
        {
          setDescription(tempE);
        }
        break;
      default:
        break;
    }
  };

  const handleProductEdit = (rowId: number) => {
    const tempId = rowId;
    const row = rows.find((row) => tempId === row.id);
    if (!row) {
      toast.error("nepodařilo se načíst data knížky pro úpravu");
      return;
    }
    const tempisImg = row.picture_url ? true : false;
    setEditBookImgExist(tempisImg);
    setEditActive(true);
    setIdToEdit(row.id);
    setName(row.name);
    setCreator(row.creator);
    setOnStock(row.on_stock);
    setRelease(row.release);
    setWhoRented(row.member_rented);
    setDescription(row.description);
  };

  const handleResetForm = () => {
    setIdToEdit(0);
    setName("");
    setCreator("");
    setOnStock(false);
    setWhoRented("");
    setDescription("");
    setRelease("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full flex-grow bg-white  dark:bg-zinc-600">
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
            columns={bookColumnList}
            handleSorting={handleSorting}
            sortingColumn={sortingColumn}
            sortingOrder={sortingOrder}
          />
          <tbody>
            <tr className="dark:hover:bg-gray border-b text-start dark:text-white  text-xs odd:bg-white dark:odd:bg-zinc-800 even:bg-gray-100 hover:bg-gray-50   dark:even:bg-zinc-700 md:text-sm">
              <td className="max-w whitespace-normal border-[1px]    py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                <input
                  type="text"
                  placeholder="ID"
                  className="h-8 w-full rounded border"
                  disabled
                  value={idToEdit}
                />
              </td>

              <td className="max-w whitespace-normal border-[1px]    py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                <input
                  type="text"
                  placeholder="Zadejte název"
                  className="h-8 w-full min-w-32 rounded border dark:bg-zinc-100"
                  onChange={(event) =>
                    handleProductChange(event.target.value, "name")
                  }
                  value={name}
                  disabled={rowsLoading}
                />
              </td>

              <td className="max-w whitespace-normal border-[1px]    py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                <input
                  type="text"
                  placeholder="Zadejte název"
                  className="h-8 w-full min-w-32 rounded border dark:bg-zinc-100"
                  onChange={(event) =>
                    handleProductChange(event.target.value, "creator")
                  }
                  value={creator}
                  disabled={rowsLoading}
                />
              </td>

              <td className="max-w whitespace-normal border-[1px]    py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                <select
                  className="h-8 w-full min-w-20 rounded border dark:bg-zinc-100"
                  onChange={(event) =>
                    handleProductChange(event.target.value, "onStock")
                  }
                  value={String(onStock)}
                  disabled={rowsLoading}
                >
                  <option value="true">Ano</option>
                  <option value="false">Ne</option>
                </select>
              </td>

              <td className="max-w whitespace-normal border-[1px]    py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                <input
                  type="text"
                  placeholder="Zadejte název"
                  className="h-8 w-full min-w-32 rounded border dark:bg-zinc-100"
                  onChange={(event) =>
                    handleProductChange(event.target.value, "whoRented")
                  }
                  value={whoRented}
                  disabled={rowsLoading}
                />
              </td>
              <td className="max-w whitespace-normal border-[1px]    py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                <input
                  type="text"
                  className="h-8 w-full min-w-24 rounded border px-1 dark:bg-zinc-100"
                  onChange={(event) =>
                    handleProductChange(event.target.value, "release")
                  }
                  value={release}
                  disabled={rowsLoading}
                />
              </td>

              <td className="max-w flex-col whitespace-normal py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                <div className="relative w-full">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="peer relative h-10 w-full min-w-[100px] text-xs rounded border dark:border-zinc-600 px-2 py-2.5 dark:text-white text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-amber-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 [&::file-selector-button]:hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                    disabled={rowsLoading}
                  />
                </div>
              </td>
              <td className="max-w whitespace-normal border-[1px]    py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                <textarea
                  rows={8}
                  className="h-20 w-full min-w-24 rounded border px-1 dark:bg-zinc-100"
                  onChange={(event) =>
                    handleProductChange(event.target.value, "description")
                  }
                  value={description}
                  disabled={rowsLoading}
                />
              </td>

              {!editActive && (
                <td
                  colSpan={2}
                  className="max-w whitespace-normal border-[1px]    py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm"
                >
                  <button
                    onClick={() => handleAdd()}
                    className="inline-flex h-8 items-center min-w-[120px] justify-center gap-2 whitespace-nowrap rounded bg-green-500 px-4 text-xs font-medium tracking-wide text-white transition duration-300 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
                    disabled={rowsLoading}
                  >
                    {rowsLoading ? <SpinnerSmallOrange /> : <span>Přidat</span>}
                  </button>
                </td>
              )}

              {editActive && (
                <>
                  <td className="max-w whitespace-normal border-[1px]    py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    <button
                      className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded bg-green-500 px-4 text-xs font-medium tracking-wide text-white transition duration-300 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
                      disabled={rowsLoading}
                      onClick={() => {
                        handleSqlProductChange();
                      }}
                    >
                      {rowsLoading ? <SpinnerSmallOrange /> : <span>OK</span>}
                    </button>
                  </td>
                  <td className="max-w whitespace-normal border-[1px]    py-2 text-xs text-gray-800 md:mx-2 md:px-2 md:text-sm">
                    <button
                      disabled={rowsLoading}
                      onClick={() => (setEditActive(false), handleResetForm())}
                      className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded bg-orange-500 px-4 text-xs font-medium tracking-wide text-white transition duration-300 hover:bg-orange-600 focus:bg-orange-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none"
                    >
                      <span> x </span>
                    </button>
                  </td>
                </>
              )}
            </tr>
            {paginatedRows.map((row) => (
              <React.Fragment key={row.id}>
                <tr className="dark:hover:bg-gray border-b text-start  dark:border-zinc-500 dark:text-white text-black text-xs odd:bg-white dark:odd:bg-zinc-800 even:bg-gray-100 hover:bg-gray-50   dark:even:bg-zinc-700 md:text-sm">
                  <td className="max-w whitespace-normal border-[1px]  py-2 text-xs  md:mx-2 md:px-2 md:text-sm">
                    {row.id}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]  py-2 text-xs  md:mx-2 md:px-2 md:text-sm">
                    {row.name}
                  </td>

                  <td className="max-w whitespace-normal border-[1px] py-2 text-xs  md:mx-2 md:px-2 md:text-sm">
                    {row.creator}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]  py-2 text-xs  md:mx-2 md:px-2 md:text-sm">
                    {row.on_stock ? (
                      <FaThumbsUp className="h-5 w-5 text-green-700" />
                    ) : (
                      <FaThumbsDown className="h-5 w-5 text-red-700" />
                    )}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]  py-2 text-xs md:mx-2 md:px-2 md:text-sm">
                    {row.member_rented}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]  py-2 text-xs  md:mx-2 md:px-2 md:text-sm">
                    {row.release}
                  </td>

                  <td className="max-w whitespace-normal border-[1px] py-2 text-xs  md:mx-2 md:px-2 md:text-sm">
                    <div className="relative h-full w-full">
                      {row.picture_url && (
                        <img
                          alt=""
                          src={row.picture_url}
                          className="rounded max-h-[100px] object-cover"
                        />
                      )}
                    </div>
                  </td>
                  <td className="max-w whitespace-normal border-[1px]  py-2 text-xs  md:mx-2 md:px-2 md:text-sm">
                    {row.description}
                  </td>
                  <td className="max-w whitespace-normal border-[1px]  py-2 text-xs  md:mx-2 md:px-2 md:text-sm">
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
                  </td>

                  <td className="max-w whitespace-normal border-[1px]  py-2 text-xs md:mx-2 md:px-2 md:text-sm">
                    <button
                      disabled={rowsLoading}
                      onClick={() => handleProductEdit(row.id)}
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
