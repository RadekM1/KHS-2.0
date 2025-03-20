"use client";

import { RegistrationSchema } from "@/src/schemas/registration";
import { UseFormRegister } from "react-hook-form";
import { PasswordInput } from "../inputs/password-input-registration";
import { useState } from "react";
import { RestorePassSchema } from "@/src/schemas/restore-password";

interface FormInputProps {
  register: UseFormRegister<RegistrationSchema | RestorePassSchema>;
  passError: string;
  confirmPassError: string;
}

export const PasswordInputCover = ({
  register,
  passError,
  confirmPassError,
}: FormInputProps) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const isSamePass = confirmPass === password;

  return (
    <>
      <div className="w-full justify-center items-center gap-2 mt-1 flex flex-col">
        <PasswordInput
          label="Heslo"
          error={passError}
          isSamePass={isSamePass}
          password={password}
          setPassword={setPassword}
          name="password"
          register={register}
        />
      </div>
      <div className="w-full gap-2 mt-1 justify-center items-center flex flex-col">
        <PasswordInput
          label="Ověřit heslo"
          error={confirmPassError}
          isSamePass={isSamePass}
          password={confirmPass}
          setPassword={setConfirmPass}
          name="confirmPassword"
          register={register}
        />
      </div>
    </>
  );
};
