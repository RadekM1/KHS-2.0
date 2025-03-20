"use client";

import { MdAdminPanelSettings } from "react-icons/md";

import { SpinnerSmallOrange } from "@/src/components/spinners/spinnerSmallOrange";
import { toast } from "sonner";
import { ForgotenSchema, forgotenSchema } from "@/src/schemas/forgotten";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/src/lib/server-functions/backend/users/reset-password";
import { FormInputWithIcon } from "../inputs/form-input-with-icon";
import { MdOutlineMail } from "react-icons/md";

export const ForgottenPassForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotenSchema>({
    resolver: zodResolver(forgotenSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgottenSubmit = async (data: ForgotenSchema) => {
    const result = await resetPassword(data.email);
    if (!result.ok) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
  };

  return (
    <>
      <div className="mb-4 flex flex-row items-center justify-center">
        <MdAdminPanelSettings className="mr-2 h-8 w-8" />
        <div className="text-2xl">Obnovit heslo</div>
      </div>

      <div className="mx-10 flex flex-col items-center">
        <div className="flex flex-col items-center rounded-2xl p-3">
          <form
            onSubmit={handleSubmit(forgottenSubmit, (errors) =>
              console.log("Form errors:", errors),
            )}
          >
            <FormInputWithIcon
              label="E-mail"
              Icon={MdOutlineMail}
              name="email"
              register={register}
              type="email"
              error={errors.email?.message ?? ""}
            />
            <div className="mt-4">
              <button
                type="submit"
                className="rounded border border-orange-600 bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:border-gray-200 disabled:bg-orange-100 dark:disabled:border-gray-500 dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
                disabled={isSubmitting}
              >
                <div className="flex h-min flex-row">
                  {isSubmitting ? (
                    <SpinnerSmallOrange />
                  ) : (
                    <span className="w-full text-center">Odeslat</span>
                  )}
                </div>
              </button>
            </div>
          </form>
          <p className="py-4">
            Zadejte váš email jenž byl zadán při registraci. Pokud se nalézá v
            databází dorazí email pro obnovu hesla.
          </p>
        </div>
      </div>
    </>
  );
};
