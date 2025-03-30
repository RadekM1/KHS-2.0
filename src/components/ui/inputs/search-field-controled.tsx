"use client";

import * as React from "react";
import { FaSearch } from "react-icons/fa";
import { InputWithIcon } from "./controled-input-with-icon";

interface SearchFieldProps {
  searchField: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField = ({ searchField, handleChange }: SearchFieldProps) => {

  return (
    <InputWithIcon
      value={searchField}
      handleChange={handleChange}
      label="Prohledat články"
      Icon={FaSearch}
    />
  );
};
