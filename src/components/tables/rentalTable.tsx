"use client";

import React, { useEffect, useState } from "react";
import ArraySort from "@/src/lib/functions/arraySort";
import { SearchField } from "../ui/inputs/search-field-controled";
import { ResetBtn } from "../btns/resetBtn";
import { MdDeleteForever } from "react-icons/md";
import { LinearProgressBar } from "../spinners/linear";
import { CiEdit } from "react-icons/ci";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { rentalTableColumns } from "@/src/static-objects/table-columns/rental";
import { TableHead } from "./table-head";
import { TableFooter } from "./table-footer";
import { getRentals } from "@/src/lib/server-functions/backend/rental-table/get-rental-items";
import { toast } from "sonner";
import { updateRentalItem } from "@/src/lib/server-functions/backend/rental-table/update-rental-item";
import { deleteRental } from "@/src/lib/server-functions/backend/rental-table/delete-rental-item";
import { createRentalItem } from "@/src/lib/server-functions/backend/rental-table/create-rental-item";
import { RentalRowsSchema } from "@/src/schemas/queries/tables/rental-table-schema";

export const RentalTable =() => {
  const [rows, setRows] = useState<RentalRowsSchema>([]);
  const [sortingColumn, setsortingColumn] = useState<string>('');
  const [sortingOrder, setSortingOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchField, setSearchField] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const [rowsLoading, setRowsLoading] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [idToEdit, setIdToEdit] = useState<number>(0);
  const [productName, setProductName] = useState<string>("");
  const [pieces, setPieces] = useState<number>(0);
  const [onStock, setOnStock] = useState<boolean>(false);
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const [whoReserved, setWhoResereved] = useState<string>("");
  const [whoRented, setWhoRented] = useState<string>("");

  interface SearchChangeEvent {
    target: {
      value: string;
    };
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRowsLoading(true);
    const response = await getRentals()
    if(!response.ok){
      toast.error(response.message)
      setRowsLoading(false)
      return
    }
    setRows(response.rows)
    setRowsLoading(false);
    }

  const handleDel = async (id:number) => {
    const confirmDel = confirm(`opravdu chcete smazat produkt č. ${id} ?`);
    if (!confirmDel) {
      return;
    }
    const response = await deleteRental(id)
    if(!response.ok){
      toast.error(response.message)
      setRowsLoading(false)
      return
    }
    fetchData()
    setRowsLoading(false);
  }


  const handleItemChange = async () => {
    if (productName.length <= 1 || pieces < 1) {
      alert("není zadán název produktu nebo počet kusů");
      return;
    }
    setRowsLoading(true);
    const response = await updateRentalItem(
      productName,
      pieces,
      isReserved,
      onStock,
      whoRented,
      whoReserved,
      idToEdit, 
    )
    if (!response.ok) {
      toast.error(response.message)
      setRowsLoading(false)
      return;
    }
    setEditActive(false);
    fetchData();
    handleResetForm();
    setRowsLoading(false)
  };


  const handleAdd = async () => {
    if (productName.length <= 1 || pieces < 1) {
      alert("není zadán název produktu nebo počet kusů");
      return;
    }
    setRowsLoading(true);
    const response = await createRentalItem(
      productName,
      pieces,
      isReserved,
      onStock,
      whoRented,
      whoReserved,
    )
    if (!response.ok) {
      toast.error(response.message)
      setRowsLoading(false)
      return;
    }
    fetchData();
    handleResetForm();
    setRowsLoading(false);
    }


  const rowsPerPage = 20;

  useEffect(() => {
    const filter = rows.filter((row) => {
      const keys = Object.keys(row);
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


  const handleChange = (event: SearchChangeEvent): void => {
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
      case "productName":
        {
          setProductName(tempE);
        }
        break;
      case "pieces":
        {
          setPieces(tempE);
        }
        break;
      case "onStock":
        {
          setOnStock(tempE);
        }
        break;
      case "isReserved":
        {
          setIsReserved(tempE);
        }
        break;
      case "whoReserved":
        {
          setWhoResereved(tempE);
        }
        break;
      case "whoRented":
        {
          setWhoRented(tempE);
        }
        break;
      default:
        break;
    }
  };

  const handleProductEdit = (rowId: number) => {
    const tempId = rowId;
    const row = rows.find((row) => tempId === row.id);
    if (!row) return;
    const rentedPerson = row.member_rented === null ? "" : row.member_rented;
    const reservedPerson =
      row.member_reserved === null ? "" : row.member_reserved;

    setEditActive(true);
    setIdToEdit(row.id);
    setProductName(row.item_name);
    setPieces(row.pieces);
    setOnStock(row.on_stock);
    setIsReserved(row.reserved);
    setWhoResereved(row.member_reserved) === null
      ? setWhoRented("")
      : setWhoResereved(reservedPerson);
    setWhoRented(row.member_rented) === setWhoRented(rentedPerson);
  };

  const handleResetForm = () => {
    setIdToEdit(0);
    setProductName("");
    setPieces(0);
    setOnStock(false);
    setIsReserved(false);
    setWhoResereved("");
    setWhoRented("");
  };

  return (
    <div className="w-full flex-grow bg-white  dark:bg-zinc-700">
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
        <table className="relative min-w-full dark:border-gray-800 overflow-auto text-xs text-black dark:text-wh md:text-start md:text-sm">
          <TableHead 
            columns={rentalTableColumns}
            handleSorting={handleSorting}
            sortingColumn={sortingColumn}
            sortingOrder={sortingOrder}
          />
          <tbody>
            <tr className="dark:hover:bg-gray border-b text-start dark:text-white  text-xs odd:bg-white dark:odd:bg-zinc-800 even:bg-gray-100 hover:bg-gray-50   dark:even:bg-zinc-700 md:text-sm">
              <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                <input
                  type="text"
                  placeholder="ID"
                  className="h-8 w-full  rounded border"
                  disabled
                  value={idToEdit}
                />
              </td>

              <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                <input
                  type="text"
                  placeholder="Zadejte název"
                  className="h-8 w-full min-w-32 bg-zinc-600 rounded border  "
                  onChange={(event) =>
                    handleProductChange(event.target.value, "productName")
                  }
                  value={productName}
                  disabled={rowsLoading}
                />
              </td>

              <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                <input
                  type="number"
                  placeholder="Zadejte počet"
                  className="h-8 w-full rounded bg-zinc-600 border  "
                  onChange={(event) =>
                    handleProductChange(event.target.value, "pieces")
                  }
                  value={pieces}
                  disabled={rowsLoading}
                />
              </td>

              <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                <select
                  className="h-8 w-full bg-zinc-600 min-w-20 rounded border  "
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

              <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                <select
                  className="h-8 w-full bg-zinc-600 min-w-20 rounded border  "
                  onChange={(event) =>
                    handleProductChange(event.target.value, "isReserved")
                  }
                  value={String(isReserved)}
                  disabled={rowsLoading}
                >
                  <option value="true">Ano</option>
                  <option value="false">Ne</option>
                </select>
              </td>

              <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                <input
                  type="text"
                  className="h-8 w-full min-w-24 bg-zinc-600 rounded border px-1  "
                  onChange={(event) =>
                    handleProductChange(event.target.value, "whoReserved")
                  }
                  value={whoReserved}
                  disabled={rowsLoading}
                />
              </td>

              <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                <input
                  type="text"
                  className="h-8 w-full min-w-24 bg-zinc-600 rounded border px-1  "
                  onChange={(event) =>
                    handleProductChange(event.target.value, "whoRented")
                  }
                  value={whoRented}
                  disabled={rowsLoading}
                />
              </td>

              {!editActive && (
                <td
                  colSpan={2}
                  className="max-w whitespace-normal border-[1px] bg-zinc-600  py-2 text-xs   md:mx-2 md:px-2 md:text-sm"
                >
                  <button
                    onClick={() => handleAdd()}
                    className="inline-flex h-8 items-center min-w-[100px] justify-center gap-2 whitespace-nowrap rounded bg-green-500 px-4 text-xs font-medium tracking-wide   transition duration-300 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
                    disabled={rowsLoading}
                  >
                    {!rowsLoading && <span>Přidat</span>}
                  </button>
                </td>
              )}

              {editActive && (
                <>
                  <td className="max-w whitespace-normal border-[1px] bg-zinc-600  py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                    {!rowsLoading && (
                      <button
                        className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded bg-green-500 px-4 text-xs font-medium tracking-wide   transition duration-300 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
                        disabled={rowsLoading}
                        onClick={() => {
                          handleItemChange();
                        }}
                      >
                        <span>OK</span>
                      </button>
                    ) }
                  </td>
                  <td className="max-w whitespace-normal border-[1px] bg-zinc-600  py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                    <button
                      disabled={rowsLoading}
                      onClick={() => {
                        setEditActive(false), handleResetForm();
                      }}
                      className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded bg-orange-500 px-4 text-xs font-medium tracking-wide   transition duration-300 hover:bg-orange-600 focus:bg-orange-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none"
                    >
                      <span> x </span>
                    </button>
                  </td>
                </>
              )}
            </tr>
            {paginatedRows.map((row, i) => (
                <tr key={i} className="dark:hover:bg-gray border-b text-start dark:text-white text-black text-xs odd:bg-white dark:odd:bg-zinc-800 even:bg-gray-100 hover:bg-gray-50   dark:even:bg-zinc-700 md:text-sm">
                  <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                    {row.id}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                    {row.item_name}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                    {row.pieces}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                    {row.on_stock ? (
                      <FaThumbsUp className="h-5 w-5 text-green-700 dark:text-green-400" />
                    ) : (
                      <FaThumbsDown className="h-5 w-5 text-red-700 dark:text-red-400" />
                    )}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                    {row.reserved ? (
                      <span className="text-red-700 dark:text-green-400">ANO</span>
                    ) : (
                      <span className="text-green-700 dark:text-red-400">NE</span>
                    )}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                    {row.member_reserved}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                    {row.member_rented}
                  </td>

                  <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                      <button
                        disabled={rowsLoading}
                        onClick={() => handleDel(row.id)}
                      >
                        <MdDeleteForever
                          className={`h-7 w-7 hover:cursor-pointer ${
                            rowsLoading
                              ? "text-red-200 disabled:text-gray-100 dark:disabled:text-gray-800 dark:text-red-800"
                              : "text-red-500"
                          }`}
                        />
                      </button>
                  </td>
                  <td className="max-w whitespace-normal border-[1px]   py-2 text-xs   md:mx-2 md:px-2 md:text-sm">
                    <button
                      disabled={rowsLoading}
                      onClick={() => handleProductEdit(row.id)}
                    >
                      <CiEdit
                        className={`h-7 w-7 hover:cursor-pointer ${
                          rowsLoading
                            ? "text-orange-200 disabled:text-gray-100 dark:disabled:text-gray-800 dark:text-orange-800"
                            : "text-orange-600"
                        }`}
                      />
                    </button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableFooter 
        filteredRows={filteredRows}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
