import { IconType } from "react-icons/lib";
import React from "react";

interface InputProps {
  label: string;
  Icon: IconType;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export const InputWithIcon = ({
  label,
  Icon,
  handleChange,
  value,
}: InputProps) => {
  return (
    <>
      <div className="relative w-[280px]  dark:border-slate-600">
        <input
          id="input"
          value={value}
          onChange={handleChange}
          type="text"
          placeholder={label}
          className={`peer relative w-full  h-12 rounded border px-4 pr-12 dark:bg-zinc-950 text-zinc-500 placeholder-transparent outline-none transition-all dark:autofill:bg-zinc-950 autofill:bg-white focus:border-neutral-500 focus:outline-none  focus-visible:outline-none disabled:cursor-not-allowed  disabled:text-zinc-400`}
        />
        <label
          htmlFor="input"
          className="absolute left-2 bg-white -top-2 cursor-text px-2 text-xs dark:border-zinc-700 dark:bg-zinc-950 text-zinc-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white dark:before:bg-zinc-950 before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2  peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-neutral-500  peer-disabled:cursor-not-allowed peer-disabled:text-zinc-400 peer-disabled:before:bg-transparent"
        >
          {label}
        </label>
        <Icon className="absolute top-3 right-4 w-6 h-6 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed" />
      </div>
    </>
  );
};
