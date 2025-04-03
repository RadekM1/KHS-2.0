"use client";

import React, { useEffect, useState } from "react";

import { TableFooter } from "./table-footer";
import { UserRowsSchema } from "@/src/schemas/queries/tables/user-table-schema";
import ArraySort from "@/src/lib/functions/arraySort";
import { SearchField } from "../ui/inputs/search-field-controled";
import { ResetBtn } from "../btns/resetBtn";
import { MdDeleteForever } from "react-icons/md";
import { LinearProgressBar } from "../spinners/linear";
import { toast } from "sonner";
import { updateUserClearance } from "@/src/lib/server-functions/backend/users/user-table/update-clearance";
import { deleteUser } from "@/src/lib/server-functions/backend/users/user-table/delete-user";
import { userTableColumns } from "@/src/static-objects/table-columns/users";
import { getUsers } from "@/src/lib/server-functions/backend/users/user-table/get-users";
import { TableHead } from "./table-head";
import { lockUser } from "@/src/lib/server-functions/backend/users/user-table/lock-user";

export default function UserTable() {
  const [rows, setRows] = useState<UserRowsSchema>([]);
  const [sortingColumn, setsortingColumn] = useState<string>("");
  const [sortingOrder, setSortingOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchField, setSearchField] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<UserRowsSchema>(rows);
  const [rowsLoading, setRowsLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  interface SearchFieldChangeEvent {
    target: {
      value: string;
    };
  }

  const rowsPerPage = 50;

  const fetchData = async () => {
    setRowsLoading(true);
    const response = await getUsers();
    if (!response.ok) {
      toast.error(response.message);
      setRowsLoading(false);
      return [];
    }
    setRows(response.rows);
    setRowsLoading(false);
  };

  const handleDel = async (account: string) => {
    const confirmDel = confirm(`opravdu chcete smazat účet ${account} ?`);
    if (!confirmDel) {
      return;
    }
    setRowsLoading(true);
    const response = await deleteUser(account);
    if (!response.ok) {
      toast.error(response.message);
    }
    fetchData();
    toast.success(response.message);
    setRowsLoading(false);
  };

  const handleClearanceChange = async (account: string, clearance: string) => {
    setRowsLoading(true);
    const response = await updateUserClearance(account, clearance);
    if (!response.ok) {
      toast.error(response.message);
      setRowsLoading(false);
      return;
    }
    fetchData();
    setRowsLoading(false);
    toast.success(response.message);
  };

  const handleLocked = async (account: string, locked: boolean) => {
    const confirmDel = confirm(`opravdu chcete zablokovat účet ${account} ?`);
    if (!confirmDel) {
      return;
    }
    setRowsLoading(true);

    const response = await lockUser(account, locked);
    if (!response.ok) {
      toast.error(response.message);
    }
    fetchData();
    toast.success(response.message);
    setRowsLoading(false);
  };

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

  const handleChange = (event: SearchFieldChangeEvent): void => {
    setSearchField(event.target.value);
  };

  const HandleReset = () => {
    setSearchField("");
    setFilteredRows(rows);
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
    <div className="w-full flex-grow bg-white dark:border-gray-500 dark:bg-zinc-800">
      {rowsLoading && <LinearProgressBar />}
      <div className="flex flex-col overflow-hidden md:flex-row">
        <div className="m-4">
          <SearchField searchField={searchField} handleChange={handleChange} />
        </div>
        <div className="m-4">
          <ResetBtn handleReset={HandleReset} />
        </div>
      </div>
      <div className="scrollbar-thumb-rounded overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-800">
        <table className="relative min-w-full overflow-auto text-xs md:text-start md:text-sm">
          <TableHead
            columns={userTableColumns}
            handleSorting={handleSorting}
            sortingColumn={sortingColumn}
            sortingOrder={sortingOrder}
          />
          <tbody>
            {paginatedRows.map((row, i) => (
              <tr
                key={i}
                className="dark:hover:bg-gray border-b text-start text-xs odd:bg-white dark:odd:bg-zinc-800 even:bg-gray-100 hover:bg-gray-50 dark:bg-zinc-500-300  dark:even:bg-zinc-700 md:text-sm"
              >
                {userTableColumns.map((column) => {
                  let cellContent;
                  if (column.id === "delLabel") {
                    cellContent = (
                      <button
                        disabled={rowsLoading}
                        onClick={() => handleDel(row.account)}
                      >
                        <MdDeleteForever
                          className={`h-6 w-6 hover:cursor-pointer ${rowsLoading ? "text-red-200 dark:text-red-800" : "text-red-500"} `}
                        />
                      </button>
                    );
                  } else {
                    switch (column.key) {
                      case "clearance":
                        cellContent = (
                          <select
                            value={row.clearance}
                            disabled={rowsLoading}
                            onChange={(event) =>
                              handleClearanceChange(
                                row.account,
                                event.target.value,
                              )
                            }
                            className="h-8 rounded border   bg-white  dark:bg-gray-600"
                          >
                            <option value="visitor">Visitor</option>
                            <option value="member">Member</option>
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                          </select>
                        );
                        break;
                      case "locked":
                        cellContent = (
                          <select
                            value={row.locked ? "true" : "false"}
                            disabled={rowsLoading}
                            onChange={(event) =>
                              handleLocked(
                                row.account,
                                event.target.value === "true",
                              )
                            }
                            className="h-8 rounded border   bg-white   dark:bg-gray-600 "
                          >
                            <option value="false">Odemčeno</option>
                            <option value="true">Zamčeno</option>
                          </select>
                        );
                        break;
                      default:
                        const value = row[column.key as keyof typeof row];
                        if (value instanceof Date) {
                          cellContent = value.toLocaleString();
                        } else {
                          cellContent = value;
                        }
                        break;
                    }
                  }
                  return (
                    <td
                      key={column.label}
                      className="max-w whitespace-normal border-[1px]   py-2 text-xs  md:mx-2 md:px-2 md:text-sm"
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
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
}
