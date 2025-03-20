"use client";
import { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { SpinnerSmallOrange } from "@/src/components/spinners/spinnerSmallOrange";
import { RegistrationInput } from "../inputs/registration-input";
import { toast } from "sonner";
import {
  RegistrationSchema,
  registrationSchema,
} from "@/src/schemas/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registration } from "@/src/lib/server-functions/backend/users/registration";
import { inputs } from "@/src/static-objects/objects/registration-inputs";
import { PasswordInputCover } from "../inputs/password-input-cover";

export const RegisterForm = () => {
  const [formKey, setFormKey] = useState(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registrationSubmit = async (data: RegistrationSchema) => {
    const result = await registration(data);
    if (!result.ok) {
      toast.error(result.message);
      return;
    }
    toast.message(result.message);
    reset();
    reset(undefined, {
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
    });
    setFormKey(Date.now());
  };

  return (
    <>
      <h1 className="mb-4 flex 2xl flex-row items-center justify-center">
        <FiUserPlus className="mr-2 h-8 w-8" />
        <span>Registrace</span>
      </h1>
      <div className="flex flex-col w-full items-center rounded-2xl p-3">
        <form
          key={formKey}
          className="w-full items-center"
          onSubmit={handleSubmit(registrationSubmit, (errors) =>
            console.log("Form errors:", errors),
          )}
        >
          {inputs.map((input, i) => (
            <RegistrationInput
              key={i}
              label={input.label}
              name={input.name}
              icon={input.icon}
              register={register}
              type={input.type}
              error={errors[input.name]?.message ?? ""}
            />
          ))}
          <PasswordInputCover
            register={register}
            passError={errors["password"]?.message ?? ""}
            confirmPassError={errors["confirmPassword"]?.message ?? ""}
          />
          <button
            type="submit"
            className="rounded border mt-4 justify-center  border-orange-600 bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:border-gray-200 disabled:bg-orange-100 dark:disabled:border-gray-500 dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
            disabled={isSubmitting}
          >
            <div className="flex h-min min-w-[100px] justify-center self-center w-full items-center text-center flex-row">
              {isSubmitting ? (
                <SpinnerSmallOrange />
              ) : (
                <span className="w-full text-center">Registrovat</span>
              )}
            </div>
          </button>
        </form>
      </div>
    </>
  );
};
