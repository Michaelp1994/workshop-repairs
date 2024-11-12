"use client";
import type { Session } from "@repo/validators/auth.validators";

import React, { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useLocalStorage<string | null>("token", null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { token, setToken } = context;

  async function setAuth(session: Session) {
    try {
      const response = await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });

      if (!response.ok) {
        throw new Error("Failed to set cookie");
      }
      setToken(session.token);
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  }
  async function removeAuth() {
    try {
      const response = await fetch("/api/auth/remove-cookie", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to remove cookie");
      }
    } catch (error) {
      console.error("Error deleting cookie:", error);
    }
    setToken(null);
  }

  return { token, setAuth, removeAuth };
}
