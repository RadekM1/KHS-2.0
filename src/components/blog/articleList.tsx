"use client";

import { useSearchParams } from "next/navigation";
import { BlogCard } from "./blog-card";
import { useState, useEffect, useMemo } from "react";
import { ResetBtn } from "../btns/resetBtn";
import { PaginationComponent } from "../ui/pagination";
import { CheckboxWithText } from "../ui/inputs/checkbox";
import { ParsedPostCardSchema } from "@/src/schemas/queries/articles";
import { categoryFilter } from "@/src/lib/functions/articles-category-filter";
import { SearchField } from "../ui/inputs/search-field-controled";
import { useDebounce } from "use-debounce";

export const ArticleList = ({
  importedRows,
}: {
  importedRows: ParsedPostCardSchema[];
}) => {
  const [searchField, setSearchField] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [skaly, setSkaly] = useState<boolean>(true);
  const [hory, setHory] = useState<boolean>(true);
  const [oddil, setOddil] = useState<boolean>(true);
  const [ostatni, setOstatni] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");
  const rowsPerPage = 15;

  useEffect(() => {
    switch (currentFilter) {
      case "skaly":
        setSkaly(true);
        setHory(false);
        setOddil(false);
        setOstatni(false);
        break;
      case "horolezectvi":
        setHory(true);
        setSkaly(false);
        setOddil(false);
        setOstatni(false);
        break;
      case "oddil":
        setOddil(true);
        setSkaly(false);
        setHory(false);
        setOstatni(false);
        break;
      case "ostatni":
        setOstatni(true);
        setSkaly(false);
        setHory(false);
        setOddil(false);
        break;
      default:
        setSkaly(true);
        setHory(true);
        setOddil(true);
        setOstatni(true);
    }
  }, [currentFilter]);

  const [debouncedSearch] = useDebounce(searchField, 300);

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
  }, [importedRows, hory, skaly, oddil, ostatni, debouncedSearch]);

  useEffect(() => {
    const maxPage = Math.max(
      1,
      Math.ceil(filteredAndSearchedRows.length / rowsPerPage),
    );
    setCurrentPage((prev) => Math.min(prev, maxPage));
  }, [filteredAndSearchedRows.length]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRows = filteredAndSearchedRows.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const HandleReset = () => {
    setSkaly(true);
    setHory(true);
    setOddil(true);
    setOstatni(true);
    setSearchField("");
    setCurrentPage(1);
  };

  const handleCheckbox = (checkbox: string) => {
    switch (checkbox) {
      case "skaly":
        setSkaly((v) => !v);
        break;
      case "hory":
        setHory((v) => !v);
        break;
      case "oddil":
        setOddil((v) => !v);
        break;
      case "ostatni":
        setOstatni((v) => !v);
        break;
    }
  };

  const articleListCheckboxes = [
    { label: "Hory", checked: hory, functionLabel: "hory" },
    { label: "Skály", checked: skaly, functionLabel: "skaly" },
    { label: "Oddíl", checked: oddil, functionLabel: "oddil" },
    { label: "Ostatní", checked: ostatni, functionLabel: "ostatni" },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex-col w-full flex lg:flex-row-reverse">
        <div className="flex m-4 p-4 min-w-[250px] flex-col py-10 gap-5 rounded border border-gray-200 bg-white shadow-lg hover:shadow-gray-400 dark:border-gray-600 dark:bg-[#1E1E1E] dark:hover:shadow-gray-800">
          <SearchField
            searchField={searchField}
            handleChange={(e) => setSearchField(e.target.value)}
          />
          <p>Filtr článků dle témat</p>
          <div className="flex flex-wrap gap-4 mx-3 self-center">
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
          <div className="flex w-full min-w-[300px] flex-col justify-center text-center">
            {paginatedRows.map((item) => (
              <BlogCard key={item.slug} data={item} />
            ))}
          </div>
          <PaginationComponent
            rows={filteredAndSearchedRows}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handleChangePaginat={(_, value, setCurrentPage) =>
              setCurrentPage(value)
            }
          />
        </div>
      </div>
    </div>
  );
};
