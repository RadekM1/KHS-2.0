import { RegistrationSchema } from "@/src/schemas/registration";
import { UseFormRegister } from "react-hook-form";
import { LoginSchema } from "@/src/schemas/login";
import { IconType } from "react-icons/lib";
import { ForgotenSchema } from "@/src/schemas/forgotten";

interface FormInputProps {
  label: string;
  name: "password" | "confirmPassword" | "firstName" | "lastName" | "email";
  register: UseFormRegister<LoginSchema | RegistrationSchema | ForgotenSchema>;
  error: string;
  type: string;
  Icon: IconType;
}

export const FormInputWithIcon = ({
  error,
  type,
  label,
  name,
  register,
  Icon,
}: FormInputProps) => {
  return (
    <>
      <div className="relative w-[280px]  dark:border-slate-600 my-6">
        <input
          {...register(`${name}`)}
          id={name}
          type={type}
          placeholder={label}
          className={`peer relative w-full  h-12 rounded border ${error ? " border-red-400 " : "dark:border-zinc-700 border-gray-300"} px-4 pr-12 dark:bg-zinc-950 text-black dark:text-white placeholder-transparent outline-none transition-all dark:autofill:bg-zinc-950 autofill:bg-white focus:border-neutral-500 focus:outline-none  focus-visible:outline-none disabled:cursor-not-allowed  disabled:text-zinc-400`}
        />
        <label className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs dark:border-zinc-700 dark:bg-zinc-950 text-black dark:text-white transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white dark:before:bg-zinc-950 before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2  peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-neutral-500  peer-disabled:cursor-not-allowed peer-disabled:text-zinc-400 peer-disabled:before:bg-transparent">
          {label}
        </label>
        <Icon className="absolute top-3 right-4 w-6 h-6 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed" />
        {error && <p className="text-red-500 text-xs">{`${error}`}</p>}
      </div>
    </>
  );
};
