"use client";

import PassField from "@/src/components/auth-form/passField";
import UserField from "@/src/components/auth-form/userField";
import { useState, useEffect } from "react";
import { FiUserPlus } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import SpinnerSmallOrange from "@/src/components/spinners/spinnerSmallOrange";
import { validateEmail } from "@/src/lib/functions/validateEmail";
import { validatePassword } from "@/src/lib/functions/validatePassword";
import InputField from "@/src/components/auth-form/inputField";
import { validateName } from "@/src/lib/functions/validateName";
import { MdMarkEmailRead } from "react-icons/md";
import { SensitiveInfoProtect } from "@/src/components/sensitiveInfoProtect";
import { registration } from "@/src/lib/server-functions/backend/users/registration";
import { toast } from "sonner";

export default function Page() {
  const [errorUser, setErrorUser] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState("");
  const [errorPass, setErrorPass] = useState(undefined);
  const [passwordStrong, setPasswordStrong] = useState(false);
  const [passwordEqual, setPasswordEqual] = useState(undefined);
  const [disabled, setDisabled] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [fetching, setFetching] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(undefined);
  const [errorLastName, setErrorLastName] = useState(undefined);
  const [errorFirstNameMsg, setErrorFirstNameMsg] = useState(undefined);
  const [errorLastNameMsg, setErrorLastNameMsg] = useState(undefined);
  const [pendingReg, setPendingReg] = useState(true);

  const handleChange = (e, id) => {
    const tempVal = e.target.value;

    switch (id) {
      case "user":
        setUser(tempVal);
        break;
      case "password":
        setPassword(tempVal);
        break;
      case "passwordCheck":
        setPasswordCheck(tempVal);
        break;
      case "firstName":
        setFirstName(tempVal);
        break;
      case "lastName":
        setLastName(tempVal);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (firstName && !validateName(firstName).valid) {
      setErrorFirstName(true);
      const temp = validateName(firstName).error;
      setErrorFirstNameMsg(temp);
    } else {
      setErrorFirstName(false);
      setErrorFirstNameMsg(undefined);
    }

    if (lastName && !validateName(lastName).valid) {
      setErrorLastName(true);
      const temp = validateName(lastName).error;
      setErrorLastNameMsg(temp);
    } else {
      setErrorLastName(false);
      setErrorLastNameMsg(undefined);
    }

    if (user && !validateEmail(user)) {
      setUserErrorMessage("Nevyhovující formát");
      setErrorUser(true);
    } else if (user && validateEmail(user)) {
      setUserErrorMessage("");
      setErrorUser(false);
    } else if (!user) {
      setErrorUser(false);
      setUserErrorMessage("");
    }

    if (password && validatePassword(password)) {
      setPasswordStrong(true);
      setErrorPass(false);
    } else {
      setPasswordStrong(false);
    }

    if (password === passwordCheck) {
      setPasswordEqual(true);
      setErrorPass(false);
    } else {
      setPasswordEqual(false);
      setErrorPass(true);
    }

    const isFormValid =
      validateEmail(user) &&
      validatePassword(password) &&
      passwordEqual &&
      !errorFirstName &&
      !errorLastName &&
      !checkbox;

    setDisabled(!isFormValid);
  }, [
    user,
    password,
    passwordCheck,
    checkbox,
    firstName,
    lastName,
    errorUser,
    errorPass,
    errorFirstName,
    errorLastName,
    passwordEqual,
  ]);

  // ---------------- API ------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      user,
      password,
    };
    setDisabled(true);
    setFetching(true);
    const result = await registration(data);
    if (!result.ok) {
      setPendingReg(false);
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    setDisabled(false);
    setFetching(false);
  };

  // ---------------- API ------------------------

  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div className="mb-4 flex flex-row items-center justify-center">
        <FiUserPlus className="mr-2 h-8 w-8" />
        <div className="text-2xl">Registrace</div>
      </div>
      <div className="mx-10 flex flex-col items-center">
        <div className="flex flex-col items-center rounded-2xl p-3">
          {pendingReg && (
            <form onSubmit={handleSubmit}>
              <div className="w-full max-w-sm">
                <InputField
                  label="Jméno"
                  widthInput="280"
                  id="firstName"
                  error={errorFirstName}
                  value={firstName}
                  handleChange={handleChange}
                />
              </div>
              <div className="-mt-3 flex h-5 flex-wrap text-center text-xs text-red-400">
                {errorFirstName && errorFirstNameMsg}
              </div>
              <div className="w-full max-w-sm">
                <InputField
                  label="Příjmení"
                  widthInput="280"
                  error={errorLastName}
                  id="lastName"
                  value={lastName}
                  handleChange={handleChange}
                />
              </div>
              <div className="-mt-3 flex h-5 flex-wrap text-center text-xs text-red-400">
                {errorLastName && errorLastNameMsg}
              </div>
              <div className="mb-2 w-full max-w-sm">
                <UserField
                  error={errorUser}
                  value={user}
                  handleChange={handleChange}
                />
              </div>
              <div className="-mt-3 h-5 text-start text-xs text-red-400">
                {userErrorMessage}
              </div>
              <div className="mb-2 flex-col">
                <div className="relative flex-row">
                  <div>
                    <PassField
                      id="password"
                      label="Heslo"
                      error={errorPass}
                      handleChange={handleChange}
                    />
                  </div>
                  <div className="absolute -right-5 top-6">
                    {password && passwordEqual && (
                      <IoShieldCheckmarkOutline className="text-green-400" />
                    )}
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col">
                <PassField
                  id="passwordCheck"
                  error={errorPass}
                  label="Ověřit heslo"
                  handleChange={handleChange}
                />
                <div className="absolute -right-5 top-6">
                  {password && passwordEqual && (
                    <IoShieldCheckmarkOutline className="text-green-400" />
                  )}
                </div>
                <div
                  className={`${passwordEqual === false ? "" : "hidden"} mb-2 flex-wrap text-xs text-red-400`}
                >
                  - hesla jsou krátká, nebo rozdílná
                </div>
                <div
                  className={`${passwordStrong === false ? "" : "hidden"} flex-wrap text-xs text-red-400`}
                >
                  - heslo musí obsahovat alespoň 8 znaků, <br />
                  jedno velké písmeno a číslo
                </div>
                <div
                  className={`flex ${passwordStrong === true ? "" : "hidden"} mb-2 mt-2 flex-row justify-center`}
                >
                  <div className="text-xs text-green-400">
                    dostatečná síla hesla
                  </div>
                  <div>
                    <FaShieldAlt className="ml-2 h-4 w-4 text-green-400" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  disabled={disabled}
                  type="submit"
                  className="w-[130px] rounded border border-orange-600 bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:border-gray-200 disabled:bg-orange-100 dark:bg-orange-700 dark:hover:bg-orange-800 dark:disabled:border-gray-500 dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
                >
                  <div className="flex h-min flex-row justify-center">
                    {fetching ? <SpinnerSmallOrange /> : "Registrovat"}
                  </div>
                </button>
              </div>
            </form>
          )}
          {apiResponse?.error && (
            <span className="mt-2 text-xs text-red-400">
              {apiResponse.error}
            </span>
          )}
          {apiResponse?.message && (
            <span className="mt-14 flex flex-col items-center text-xl text-green-400 md:flex-row">
              {apiResponse.message}
              <MdMarkEmailRead className="ml-4 h-6 w-6" />
            </span>
          )}
        </div>

        <div className="hidden">
          souhlasím s podmínkami registrace
          <input
            type="checkbox"
            value={checkbox}
            onChange={(e) => setCheckbox(e.target.checked)}
          />
        </div>
      </div>
      <SensitiveInfoProtect />
    </div>
  );
}
