"use client";

import * as React from "react";
import { FaSearch } from "react-icons/fa";
import { InputWithIcon } from "./controlable-input-with-icon";

interface SearchFieldProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField = ({ handleChange }: SearchFieldProps) => {
  return (
    <InputWithIcon
      handleChange={handleChange}
      label="Prohledat články"
      Icon={FaSearch}
    />
  );
};
