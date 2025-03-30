"use client";

import { useState, useEffect } from "react";
import { useSessionContext } from "@/src/context/session-provider";
import { ProfileAllowedActions } from "@/src/static-objects/objects/dashboard-profile";

export const ProfileAllowance = () => {
  const [clearance, setClearance] = useState<string>("");

  const session = useSessionContext();
  useEffect(() => {
    if (session) {
      setClearance(session.user.clearance ?? "");
    }
  }, [session]);

  const filteredAllowance = ProfileAllowedActions.filter((item) =>
    item.clearance.includes(clearance),
  );

  return (
    <ul className="justify-start divide-y divide-slate-200 dark:divide-slate-600 dark:text-white">
      {filteredAllowance.map((item, i) => {
        return (
          <li key={i} className="flex items-start gap-4 px-4 py-3">
            <div className="flex gap-2 min-h-[2rem] w-full flex-col items-start justify-center ">
              <h3 className="text-base font-semibold dark:text-white">
                {item.title}
              </h3>
              <p className="flex w-full flex-wrap text-start text-sm ">
                {item.text}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
