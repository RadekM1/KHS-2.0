"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { useContext, createContext, useMemo } from "react";
import { SessionSchema } from "../schemas/session";

const SessionContext = createContext<SessionSchema | null>(null);

export const SessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession() as { data: SessionSchema | null };

  const sessionValue = useMemo(() => session, [session]);

  return (
    <SessionContext.Provider value={sessionValue ?? null}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};
