"use client";

import Pagination from "@mui/material/Pagination";
import { UserRowsSchema } from "@/src/schemas/queries/tables/user-table-schema";
import { RentalRowsSchema } from "@/src/schemas/queries/tables/rental-table-schema";
import { BookRowsSchema } from "@/src/schemas/queries/tables/books-table-schema";
import { ArticlesBackendSchema } from "@/src/schemas/queries/articles-dashboard";
import { NewsArticlesSchema } from "@/src/schemas/queries/news";
import { useTheme } from "next-themes";

interface TableFooterProps {
  filteredRows:
    | UserRowsSchema
    | RentalRowsSchema
    | BookRowsSchema
    | ArticlesBackendSchema
    | NewsArticlesSchema;
  currentPage: number;
  rowsPerPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const handleChangePaginat = (
  _event: React.ChangeEvent<HTMLElement>,
  value: string,
  setCurrentPage: (page: string) => void,
) => {
  const temp = value;
  setCurrentPage(temp);
};

export const TableFooter = ({
  filteredRows,
  currentPage,
  rowsPerPage,
  setCurrentPage,
}: TableFooterProps) => {
  const theme = useTheme();
  const color = theme.resolvedTheme === "dark" ? "white" : "black";

  return (
    <div className="flex flex-col">
      <div className="mt-4 flex w-full flex-col-reverse gap-3 dark:text-white md:flex-row md:justify-between">
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={currentPage}
          color="standard"
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            handleChangePaginat(event, value, setCurrentPage)
          }
          sx={{
            "& .MuiPaginationItem-root": {
              color: `${color}`,
            },
          }}
        />
      </div>
      <div className="flex justify-end dark:text-white">
        <span className="m-2 mt-4 items-center text-sm text-gray-600 dark:text-white md:mr-6">
          {filteredRows.length} položek
        </span>
      </div>
    </div>
  );
};
