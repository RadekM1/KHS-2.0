"use client";

import { ProfileAllowance } from "./profile-allowance";
import { useSessionContext } from "@/src/context/session-provider";
import { useState, useEffect } from "react";
import { ModalCrop } from "../modals/modals/modalCrop";
import AvatarPicture from "./avatarPicture";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { ProfileAccordion } from "./profile-accordion";

export const Profile = () => {
  const session = useSessionContext();
  const [clearance, setClearance] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(
    () => {
      if (session) {
        setClearance(session.user.clearance);
        setFirstName(session.user.firstName);
        setLastName(session.user.lastName);
        setEmail(session.user.email);
      }
    },
    [session] as const,
  );

  const handleCLick = () => {
    setOpen(true);
  };
  return (
    <div className="container mx-auto mt-5 flex w-full flex-col-reverse justify-center overflow-hidden lg:flex-row lg:justify-normal">
      <div className="mt-2 flex dark:bg-zinc-800 w-full flex-col justify-start overflow-hidden rounded-2xl border-[1px] border-gray-200 bg-white p-3 shadow-md dark:border-gray-800  dark:text-gray-200 lg:m-5 lg:w-2/3">
        <section className="w-full  divide-y divide-slate-200 rounded dark:divide-slate-600">
          <div className="flex  flex-row">
            <div className="mb-2 mr-4 text-start text-xl font-bold text-slate-700">
              <IoMdHelpCircleOutline className="h-8 w-8 text-orange-400 dark:text-orange-300" />
            </div>
            <div className="mb-2 text-start text-xl font-bold text-slate-700 dark:text-white dark:hover:text-white">
              Nápověda
            </div>
          </div>
          <ProfileAccordion />
        </section>
      </div>
      <div className="flex flex-col items-end lg:flex-shrink lg:flex-grow">
        <div className="flex w-full flex-row">
          <div className="mr-10 flex flex-grow items-start justify-end text-start lg:mr-0 lg:justify-start">
            <ul className="text-slate-700 dark:text-white">
              <li className="mb-2 text-2xl font-bold dark:text-white">
                {firstName} {lastName}
              </li>
              <li className="mb-2 text-slate-500 dark:text-white">{email}</li>
              <li className="mb-2 text-slate-500 dark:text-white">
                Úroveň oprávnění: {clearance}
              </li>
              <li className="text-slate-500 dark:text-white">
                Povolené aktivity:
              </li>
            </ul>
          </div>
          <div className="mx-2 flex-shrink">
            <AvatarPicture handleCLick={handleCLick} />
          </div>
        </div>
        <div className="flex w-full justify-start my-4 rounded-xl dark:bg-zinc-800 dark:text-white">
          <ProfileAllowance />
        </div>
        <div className="hidden">
          <ModalCrop open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};
