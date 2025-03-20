"use client";

import { MdAdminPanelSettings } from "react-icons/md";
import { PasswordInputCover } from "../inputs/password-input-cover";
import { SpinnerSmallOrange } from "@/src/components/spinners/spinnerSmallOrange";
import { toast } from "sonner";
import {
  RestorePassSchema,
  restorePassSchema,
} from "@/src/schemas/restore-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePassword } from "@/src/lib/server-functions/backend/users/change-password";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const RestorePassForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RestorePassSchema>({
    resolver: zodResolver(restorePassSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const filteredToken = searchParams.get("token");

  const forgottenSubmit = async (data: RestorePassSchema) => {
    if (!filteredToken) {
      toast.error(
        "nenalezen obnovovací token, zkuste znovu kliknout na odkaz v emailu",
      );
      return;
    }
    const result = await changePassword(data.password, filteredToken ?? "");
    if (!result.ok) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    router.push("/login");
  };

  return (
    <>
      <div className="mb-4 flex flex-row items-center justify-center">
        <MdAdminPanelSettings className="mr-2 h-8 w-8" />
        <div className="text-2xl">Nové heslo</div>
      </div>

      <div className="mx-10 flex flex-col items-center">
        <div className="flex flex-col items-center rounded-2xl p-3">
          <form
            onSubmit={handleSubmit(forgottenSubmit, (errors) =>
              console.log("Form errors:", errors),
            )}
          >
            <PasswordInputCover
              register={register}
              passError={errors.password?.message ?? ""}
              confirmPassError={errors.confirmPassword?.message ?? ""}
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
        </div>
      </div>
    </>
  );
};
