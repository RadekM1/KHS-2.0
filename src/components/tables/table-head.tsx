"use client";

import { RiArrowDropDownLine } from "react-icons/ri";

interface TableHeadProps {
  columns: { key: string; id?: string, label: string; sorting: boolean }[];
  handleSorting: (key: string) => void;
  sortingColumn: string;
  sortingOrder: string;
}

export const TableHead = ({
  columns,
  handleSorting,
  sortingColumn,
  sortingOrder,
}: TableHeadProps) => {
  return (
    <thead className="rounded-xl  border-gray-300 dark:border-gray-500 text-xs text-gray-700 md:text-sm">
      <tr className="align-top">
        {columns.map((column) => (
          <th
            key={column.label}
            onClick={
              column.sorting === true
                ? () => handleSorting(column.key)
                : undefined
            }
            scope="col"
            className={`border-[1px] border-gray-300 dark:border-gray-500 bg-slate-50 pl-1 font-thin dark:bg-zinc-600 dark:text-white ${
              column.sorting === true
                ? "hover:cursor-pointer hover:bg-slate-200"
                : ""
            } z-10 w-auto border-[1px] py-2 pr-4 text-start text-xs md:mx-2 md:text-sm`}
          >
            {column.label}
            {column.sorting === true && (
              <RiArrowDropDownLine
                className={`${
                  column.key === sortingColumn && sortingOrder === "asc"
                    ? "rotate-180 text-green-400"
                    : ""
                } ${
                  column.key === sortingColumn && sortingOrder === "desc"
                    ? "rotate-0 text-red-400"
                    : ""
                } h-8 w-8 font-bold text-gray-400`}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};
