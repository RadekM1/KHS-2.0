"use client";

import React, { useState } from "react";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { UseFormRegister } from "react-hook-form";
import { LoginSchema } from "@/src/schemas/login";

interface FormInputProps {
  label: string;
  name: "password";
  register: UseFormRegister<LoginSchema>;
  error: string;
}

export const PasswordInput = ({
  error,
  label,
  name,
  register,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-[280px] relative items-center justify-center flex flex-row">
      <div className="relative flex self-center w-full flex-col my-6">
        <input
          {...register(`${name}`)}
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={label}
          className={`peer relative h-12 w-full rounded border ${error ? " border-red-400 " : "dark:border-zinc-700 border-gray-300"} px-4 pr-12 dark:bg-zinc-950 text-black dark:text-white placeholder-transparent outline-none transition-all dark:autofill:bg-zinc-950 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-neutral-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed  disabled:text-zinc-400`}
        />
        <label className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs dark:border-zinc-700 dark:bg-zinc-950 text-black dark:text-white transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white dark:before:bg-zinc-950 before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-neutral-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-zinc-400 peer-disabled:before:bg-transparent">
          {label}
        </label>
        {showPassword ? (
          <IoEyeOffSharp
            onClick={() => setShowPassword(false)}
            className="absolute top-3 right-4 w-6 h-6 cursor-pointer stroke-zinc-400 peer-disabled:cursor-not-allowed"
          />
        ) : (
          <IoEyeSharp
            onClick={() => setShowPassword(true)}
            className="absolute top-3 right-4 w-6 h-6 cursor-pointer stroke-zinc-400 peer-disabled:cursor-not-allowed"
          />
        )}
        {error && <p className="text-red-500 text-xs">{`${error}`}</p>}
      </div>
    </div>
  );
};
