import { RegistrationSchema } from "@/src/schemas/registration";
import { UseFormRegister } from "react-hook-form";
import React from "react";
import { FormInputWithIcon } from "../inputs/form-input-with-icon";
import { IconType } from "react-icons/lib";

interface FormInputProps {
  label: string;
  name: "password" | "firstName" | "lastName" | "email" | "confirmPassword";
  register: UseFormRegister<RegistrationSchema>;
  type: string;
  error: string;
  icon: IconType;
}

export const RegistrationInput = ({
  label,
  name,
  register,
  icon,
  type,
  error,
}: FormInputProps) => {
  return (
    <div className="w-full mt-1 items-center flex flex-col">
      <FormInputWithIcon
        Icon={icon}
        label={label}
        error={error}
        type={type}
        name={name}
        register={register}
      />
    </div>
  );
};
