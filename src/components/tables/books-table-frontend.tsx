"use client";

import React, { useEffect, useState } from "react";
import { TableFooter } from "./table-footer";
import ArraySort from "@/src/lib/functions/arraySort";
import { SearchField } from "../ui/inputs/search-field-controled";
import { ResetBtn } from "../btns/resetBtn";
import { LinearProgressBar } from "../spinners/linear";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { bookColumnListFrontend } from "@/src/static-objects/table-columns/books";
import { getBooksFrontend } from "@/src/lib/server-functions/frontend/books-fetch";
import { toast } from "sonner";
import { TableHead } from "./table-head";
import { BookRowsSchemaFrontend } from "@/src/schemas/queries/tables/books-table-schema";

interface SearchFieldChangeEvent {
  target: {
    value: string;
  };
}

export const BooksTableFrontend = () => {
  const [rows, setRows] = useState<BookRowsSchemaFrontend>([]);
  const [sortingColumn, setsortingColumn] = useState<string>("");
  const [sortingOrder, setSortingOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchField, setSearchField] = useState<string>("");
  const [filteredRows, setFilteredRows] =
    useState<BookRowsSchemaFrontend>(rows);
  const [rowsLoading, setRowsLoading] = useState<boolean>(false);
  const rowsPerPage = 20;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRowsLoading(true);
    const response = await getBooksFrontend();
    if (!response.ok) {
      toast.error(response.message);
      setRowsLoading(false);
      return;
    }
    setRows(response.rows);
    setRowsLoading(false);
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
            columns={bookColumnListFrontend}
            handleSorting={handleSorting}
            sortingColumn={sortingColumn}
            sortingOrder={sortingOrder}
          />
          <tbody>
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
