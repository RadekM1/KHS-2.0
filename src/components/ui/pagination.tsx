import { ParsedPostCardSchema } from "@/src/schemas/queries/articles";
import Pagination from "@mui/material/Pagination";

interface PaginationProps {
  rows: ParsedPostCardSchema[];
  rowsPerPage: number;
  currentPage: number;
  handleChangePaginat: (
    event: React.ChangeEvent<unknown>,
    value: number,
    setCurrentPage: (page: number) => void,
  ) => void;
  setCurrentPage: (currentPage: number) => void;
}

export const PaginationComponent = ({
  rows,
  rowsPerPage,
  currentPage,
  handleChangePaginat,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <div className="flex flex-col">
      <div className="mt-4 flex w-full flex-col-reverse gap-3 dark:text-white md:flex-row md:justify-between">
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={currentPage}
          color="standard"
          id="prepinani-pagination"
          onChange={(event, value) =>
            handleChangePaginat(event, value, setCurrentPage)
          }
          sx={{
            "& .MuiPaginationItem-root": {
              color: "gray",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "gray",
              color: "white",
            },
          }}
        />
      </div>
      <div className="flex justify-end">
        <span className="m-2 mt-4 items-center text-sm text-gray-600 dark:text-white md:mr-6">
          počet článků ve filtru: {rows.length}
        </span>
      </div>
    </div>
  );
};
