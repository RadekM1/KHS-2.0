"use client";

import { MdAdminPanelSettings } from "react-icons/md";
import { useState, useEffect } from "react";
import { SpinnerSmallOrange } from "@/src/components/spinners/spinnerSmallOrange";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { authentication } from "@/src/lib/server-functions/backend/users/authentication";
import { toast } from "sonner";
import { useSessionContext } from "@/src/context/session-provider";
import { LoginSchema } from "@/src/schemas/login";
import { useForm } from "react-hook-form";
import { FormInputWithIcon } from "../inputs/form-input-with-icon";
import { MdOutlineMail } from "react-icons/md";
import { PasswordInput } from "../inputs/password-input";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const searchParams = useSearchParams();
  const session = useSessionContext();
  const [fetching, setFetching] = useState(false);
  const [activationTokenState, setActivationTokenState] = useState<string>("");

  useEffect(() => {
    const activationToken = searchParams.get("token");
    if (activationToken) {
      setActivationTokenState(activationToken);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activationTokenState) {
      AuthenticateUser();
    }
  }, [activationTokenState]);

  const AuthenticateUser = async () => {
    setFetching(true);
    const response = await authentication(activationTokenState);
    if (!response.ok) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    setFetching(false);
  };
  const logoutTrigger: string = searchParams.get("filter") ?? "";

  useEffect(() => {
    if (logoutTrigger === "logout" && !session?.user) {
      toast.success("byli jste úspěšně odhlášení");
    }
  }, [logoutTrigger, session]);

  const loginSubmit = async (data: LoginSchema) => {
    const response = await signIn("credentials", {
      redirect: false,
      account: data.email,
      password: data.password,
    });

    if (!response?.ok) {
      setFetching(false);
      toast.error(response?.error);
      return;
    }
    setFetching(false);
    window.location.href = "/dashboard/profil";
  };

  return (
    <>
      <div className="mb-4 flex flex-row items-center justify-center">
        <MdAdminPanelSettings className="mr-2 h-8 w-8" />
        <div className="text-2xl">Přihlášení</div>
      </div>

      <div className="mx-10 flex flex-col items-center">
        <div className="flex flex-col items-center rounded-2xl p-3">
          <form
            onSubmit={handleSubmit(loginSubmit, (errors) =>
              console.log("Form errors:", errors),
            )}
          >
            <FormInputWithIcon
              label="E-mail"
              name="email"
              Icon={MdOutlineMail}
              register={register}
              type="email"
              error={""}
            />
            <PasswordInput
              label="Heslo"
              name="password"
              register={register}
              error={""}
            />
            <div className="mt-4">
              <button
                type="submit"
                className="rounded border border-orange-600 bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:border-gray-200 disabled:bg-orange-100 dark:disabled:border-gray-500 dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
                disabled={isSubmitting}
              >
                <div className="flex h-min flex-row">
                  {isSubmitting || fetching ? (
                    <SpinnerSmallOrange />
                  ) : (
                    <span className="w-full text-center">Přihlásit</span>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center md:flex-row">
        <div className="mb-10 mt-8 flex w-full flex-col justify-center text-center">
          <Link
            href="/zapomenute-heslo"
            className="hover:text-orange-600 dark:hover:text-orange-200"
          >
            Zapomenuté heslo
          </Link>
          <div className="mb-10 mt-8 flex w-full flex-col justify-center text-center">
            <Link
              href="/registration"
              className="hover:text-orange-600 dark:hover:text-orange-200"
            >
              Zaregistrovat
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
