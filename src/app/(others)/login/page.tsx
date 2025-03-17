"use client";

import PassField from "@/src/components/auth-form/passField";
import UserField from "@/src/components/auth-form/userField";
import { MdAdminPanelSettings } from "react-icons/md";
import { useState, useEffect } from "react";
import SpinnerSmallOrange from "@/src/components/spinners/spinnerSmallOrange";
import Link from "next/link";
import { validateEmail } from "@/src/lib/functions/validateEmail";
import InputField from "@/src/components/auth-form/inputField";
import { useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function Page() {
  const searchParams = useSearchParams();

  const { data: session } = useSession();

  const [email, setEmail] = useState(undefined);

  const [responseForgoten, setResponseForgoten] = useState(undefined);
  const [forgotenErrorMessage, setForgotenErrorMessage] = useState(undefined);
  const [errorForgoten, setErrorForgoten] = useState(false);
  const [forgotenVisible, setForgotenVisible] = useState("hidden");
  const [errorEmail, setErrorEmail] = useState(undefined);
  const [emailErrorMessage, setEmailErrorMessage] = useState(undefined);
  const [responseText, setResponseText] = useState(undefined);
  const [disableLogin, setDisableLogin] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState(undefined);
  const [activationTokenState, setActivationTokenState] = useState(undefined);
  const [activationTokenStateMsg, setActivationTokenStateMsg] = useState("");

  useEffect(() => {
    const activationToken = searchParams.get("token");
    const userToAuth = searchParams.get("account");

    if (userToAuth) {
      setUser(userToAuth);
    }

    if (activationToken) {
      setActivationTokenState(activationToken);
    }
  }, [searchParams]);

  //--------------------------authentication API----------------------

  useEffect(() => {
    if (activationTokenState) {
      AuthenticateUser();
    }
  }, [activationTokenState]);

  const AuthenticateUser = async () => {
    setDisableLogin(true);
    setFetching(true);

    const data = {
      authToken: activationTokenState,
      operation: "authentication",
    };

    try {
      const response = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.message) {
        setActivationTokenStateMsg(result.message);
      }
      if (result.error) {
        setActivationTokenStateMsg(result.error);
      }
    } catch (error) {
      setActivationTokenStateMsg(error);
    } finally {
      setDisableLogin(false);
      setFetching(false);
      setActivationTokenState(undefined);
    }
  };

  //--------------------------authentication API----------------------

  const handleChange = (e, id) => {
    const tempVal = e.target.value;
    const tempId = id;

    switch (tempId) {
      case "user": {
        setUser(tempVal);
        break;
      }
      case "password": {
        setPassword(tempVal);
        break;
      }
      case "forgoten":
        {
          setEmail(tempVal);
        }
        break;
      default:
        break;
    }
  };

  const handleForgotenVisibility = () => {
    setForgotenVisible("");
  };

  const logoutTrigger = searchParams.get("filter");

  useEffect(() => {
    if (user && !validateEmail(user)) {
      setErrorEmail(true);
      setEmailErrorMessage("Nevyhovující formát");
    } else if (user && validateEmail(user)) {
      setErrorEmail(false);
      setEmailErrorMessage(undefined);
    } else if (!user) {
      setErrorEmail(false);
      setEmailErrorMessage(undefined);
    }
  }, [user]);

  // ---------------- API LOGIN ------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setDisableLogin(true);
    setFetching(true);

    const result = await signIn("credentials", {
      redirect: false,
      account: user,
      password,
    });

    setFetching(false);

    if (result.error) {
      setResponseText(result.error);

      setDisableLogin(false);
    } else {
      window.location.href = "/dashboard/profil";
    }
  };
  // ---------------- API LOGIN ------------------------

  // ---------------- API FORGOTTEN EMAIL --------------

  const handlePassReset = async (e) => {
    e.preventDefault();

    const data = {
      EmailForRestorePass: email,
      operation: "restorePassword",
    };
    try {
      setDisableLogin(true);
      setFetching(true);

      const response = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setResponseForgoten(result);
    } catch (error) {
      const chyba = {};
      chyba.error = "nepodařilo se zadat údaje do databáze";
      setResponseForgoten(chyba.error);
    } finally {
      setDisableLogin(false);
      setFetching(false);
    }
  };

  // ---------------- API FORGOTTEN EMAIL --------------

  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div className="mb-4 flex flex-row items-center justify-center">
        <MdAdminPanelSettings className="mr-2 h-8 w-8" />
        <div className="text-2xl">Přihlášení</div>
      </div>
      <div className="borde-b border-b-orange-400 text-xl text-orange-500">
        {activationTokenStateMsg}
      </div>
      <div>
        {logoutTrigger === "logout" &&
        (session === undefined || session === null) ? (
          <span className="text-green-500">byli jste úšpěšně odhlášení</span>
        ) : (
          ""
        )}
      </div>
      <div className="mx-10 flex flex-col items-center">
        <div className="flex flex-col items-center rounded-2xl p-3">
          <form onSubmit={handleLogin}>
            <div className="w-full max-w-sm">
              <UserField error={errorEmail} handleChange={handleChange} />
              <span className="text-xs text-red-400">{emailErrorMessage}</span>
            </div>
            <div className="mt-4">
              <PassField
                id="password"
                label="Heslo"
                handleChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="rounded border border-orange-600 bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:border-gray-200 disabled:bg-orange-100 dark:disabled:border-gray-500 dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
                disabled={disableLogin}
              >
                <div className="flex h-min flex-row">
                  {fetching ? <SpinnerSmallOrange /> : "Přihlásit"}
                </div>
              </button>
            </div>
          </form>
          {responseText && (
            <span className="mt-2 text-xs text-red-400">{responseText}</span>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col justify-center md:flex-row">
        <div className="mb-10 mt-8 flex w-full flex-col justify-center text-center">
          <div>
            <a
              href="#"
              onClick={() => handleForgotenVisibility()}
              className="hover:text-orange-600 dark:hover:text-orange-200"
            >
              Zapomenuté heslo ?
            </a>
          </div>
          <form
            className={`mt-2 flex-col text-center ${forgotenVisible}`}
            onSubmit={handlePassReset}
          >
            <InputField
              handleChange={handleChange}
              error={errorForgoten}
              id="forgoten"
              label="zadejte email"
            />
            <span className="text-red-500">{forgotenErrorMessage}</span>
            <br />

            <div>
              <button
                type="submit"
                disabled={disableLogin}
                className="mb-2 rounded border border-orange-600 bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:border-gray-200 disabled:bg-orange-100 dark:bg-orange-900 dark:hover:bg-orange-950 dark:disabled:border-gray-500 dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
              >
                {fetching ? <SpinnerSmallOrange /> : "Obnovit heslo"}
              </button>
              <div>
                <span className="text-start text-xs text-gray-500 dark:text-gray-400">
                  Zadejte váš email, pokud se nalézá <br /> v databázi, bude
                  odeslána žádost na obnovu hesla.
                </span>
              </div>
            </div>
          </form>
          {responseForgoten?.error && (
            <span className="mt-2 text-xs text-red-400">
              {responseForgoten.error}
            </span>
          )}
          {responseForgoten?.message && (
            <span className="mt-2 text-xs text-green-400">
              {responseForgoten.message}
            </span>
          )}
        </div>
        <div className="mb-10 mt-8 flex w-full flex-col justify-center text-center">
          <Link
            href="/registration"
            className="hover:text-orange-600 dark:hover:text-orange-200"
          >
            Zaregistrovat
          </Link>
        </div>
      </div>
      <div>
        <div className="mt-10 hidden">
          <label htmlFor="login_confirm">Potvrdit příhlášení</label>
          <input
            id="login_confirm"
            value="unchecked"
            onClick={() => {
              setDisableLogin(true);
            }}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
}
