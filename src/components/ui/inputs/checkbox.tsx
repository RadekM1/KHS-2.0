"use client"

import { Checkbox } from "../../btns/checkbox-v2"

interface CheckBoxProps{
    checked: boolean;
    label: string;
    handleChange: ((checked: string) => void)
    id: string;
}

export const CheckboxWithText = ({checked, id, label, handleChange}: CheckBoxProps) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox 
      checked={checked}
      onClick={ ()=> handleChange(id)}
      id={id} />
      <div className="grid gap-1.5 select-none leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    </div>
  )
}
