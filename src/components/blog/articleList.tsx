"use client";

import { useSearchParams } from "next/navigation";
import { BlogCard } from "./blog-card";
import { useState, useEffect } from "react";
import { ResetBtn } from "../btns/resetBtn";
import { PaginationComponent } from "../ui/pagination";
import { handleChangePaginat } from "@/src/lib/functions/handleChangePaginat";
import { CheckboxWithText } from "../ui/inputs/checkbox";
import { ParsedPostCardSchema } from "@/src/schemas/queries/articles";
import { categoryFilter } from "@/src/lib/functions/articles-category-filter";
import { SearchField } from "../ui/inputs/search-field-controled";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";

export const ArticleList = ({
  importedRows,
}: {
  importedRows: ParsedPostCardSchema[];
}) => {
  const [searchField, setSearchField] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [skaly, setSkaly] = useState(false);
  const [hory, setHory] = useState(false);
  const [oddil, setOddil] = useState(false);
  const [ostatni, setOstatni] = useState(false);
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");
  const rowsPerPage = 15;
  const articleListCheckboxes = [
    { label: "Hory", checked: hory, functionLabel: "hory" },
    { label: "Skály", checked: skaly, functionLabel: "skaly" },
    { label: "Oddíl", checked: oddil, functionLabel: "oddil" },
    { label: "Ostatní", checked: ostatni, functionLabel: "ostatni" },
  ];

  const [debouncedSearch] = useDebounce(searchField, 1000);

  useEffect(() => {
    switch (currentFilter) {
      case "skaly":
        setSkaly(true);
        break;
      case "horolezectvi":
        setHory(true);
        break;
      case "oddil":
        setOddil(true);
        break;
      case "ostatni":
        setOstatni(true);
        break;
      default:
        setSkaly(true);
        setHory(true);
        setOddil(true);
        setOstatni(true);
    }
  }, []);

  useEffect(() => {
    const filter = importedRows.filter((row) => {
      return categoryFilter(hory, skaly, oddil, ostatni, row);
    });
    const maxPage = Math.ceil(filter.length / rowsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [importedRows, currentPage, skaly, hory, oddil, ostatni]);

  const HandleReset = () => {
    setSkaly(true);
    setHory(true);
    setOddil(true);
    setOstatni(true);
    setSearchField("");
  };

  const filteredAndSearchedRows = useMemo(() => {
    let filtered = importedRows.filter((row) =>
      categoryFilter(hory, skaly, oddil, ostatni, row),
    );

    if (debouncedSearch.trim() !== "") {
      filtered = filtered.filter(
        (row) =>
          row.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          row.description
            ?.toLowerCase()
            .includes(debouncedSearch.toLowerCase()),
      );
    }

    return filtered;
  }, [importedRows, skaly, hory, oddil, ostatni, debouncedSearch]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRows = filteredAndSearchedRows.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const handleCheckbox = (checkbox: string) => {
    switch (checkbox) {
      case "skaly":
        setSkaly(!skaly);
        break;
      case "hory":
        setHory(!hory);
        break;
      case "oddil":
        setOddil(!oddil);
        break;
      case "ostatni":
        setOstatni(!ostatni);
        break;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex-col w-full flex lg:flex-row-reverse">
        <div className="flex m-4 p-4 min-w-[250px] flex-col max-h-min py-10 gap-5 flex-shrink rounded border border-gray-200 bg-white px-5 shadow-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400 dark:border-gray-600 dark:bg-[#1E1E1E] dark:hover:shadow-gray-800">
          <SearchField
            searchField={searchField}
            handleChange={(e) => setSearchField(e.target.value)}
          />
          <p>Filtr článků dle témat</p>
          <div className="flex-row gap-4 mx-3 flex self-center">
            {articleListCheckboxes.map((checkbox, i) => (
              <CheckboxWithText
                key={i}
                id={checkbox.functionLabel}
                label={checkbox.label}
                checked={checkbox.checked}
                handleChange={() => handleCheckbox(checkbox.functionLabel)}
              />
            ))}
          </div>
          <ResetBtn handleReset={HandleReset} />
        </div>
        <div className="flex flex-grow flex-col">
          <div className="flex w-full min-w-[300px] min-h-[300px] flex-col justify-center text-center">
            {paginatedRows.map((item) => (
              <BlogCard key={item.slug} data={item} />
            ))}
          </div>
          <PaginationComponent
            rows={filteredAndSearchedRows}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            handleChangePaginat={handleChangePaginat}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};
