import { LoginSchema } from "@/src/schemas/login";
import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: "email" | "password";
  register: UseFormRegister<LoginSchema>;
  type: string;
  error: string;
}

export const LoginInput = ({
  label,
  name,
  register,
  type,
  error,
}: FormInputProps) => {
  return (
    <div className="w-full gap-1 flex flex-col">
      <label className="text-start  font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(`${name}`)}
        className={`peer relative h-12 w-full rounded border ${error ? " border-red-400 " : "dark:border-zinc-700 border-gray-300"} px-4 pr-12 dark:bg-zinc-950 text-zinc-500 placeholder-transparent outline-none transition-all dark:autofill:bg-zinc-950 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-neutral-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed  disabled:text-zinc-400`}
        id={name}
        type={type}
      />
      {error && <p className="text-red-500 text-xs">{`${error}`}</p>}
    </div>
  );
};
