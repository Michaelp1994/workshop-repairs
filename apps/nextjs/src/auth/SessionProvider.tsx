"use client";

import type { UserID } from "@repo/validators/ids.validators";

import * as React from "react";

interface SessionData {
  userId: UserID | undefined;
}

const SessionContext = React.createContext({} as SessionData);

interface SessionProviderProps {
  session: SessionData;
  children: React.ReactNode;
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => React.useContext(SessionContext);
