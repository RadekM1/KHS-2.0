
import { Dispatch, SetStateAction } from "react";

interface CheckboxParams {
  checkbox: string;
  skaly: boolean;
  hory: boolean;
  oddil: boolean;
  ostatni: boolean;
  setSkaly: Dispatch<SetStateAction<boolean>>;
  setHory: Dispatch<SetStateAction<boolean>>;
  setOddil: Dispatch<SetStateAction<boolean>>;
  setOstatni: Dispatch<SetStateAction<boolean>>;
}

export const handleCheckbox = ({
  checkbox,
  skaly,
  hory,
  oddil,
  ostatni,
  setSkaly,
  setHory,
  setOddil,
  setOstatni,
}: CheckboxParams) => {
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
    default:
      break;
  }
};
