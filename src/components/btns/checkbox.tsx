import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { orange } from "@mui/material/colors";

interface CheckBoxProps {
  handleChange: (checked: boolean, id: string) => void;
  checked: boolean;
  disabled?: boolean;
  id: string;
  label: string;
}

export const CheckBox = ({
  checked,
  label,
  id,
  handleChange,
}: CheckBoxProps) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => handleChange(e.target.checked, id)}
            sx={{
              color: "gray",
              "&.Mui-checked": {
                color: orange[500],
              },
            }}
          />
        }
        label={label}
        sx={{
          "& .MuiFormControlLabel-label": {
            color: checked ? orange[500] : "inherit",
          },
        }}
      />
    </FormGroup>
  );
};
