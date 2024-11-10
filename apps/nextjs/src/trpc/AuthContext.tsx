"use client";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { createContext, ReactNode, useContext } from "react";

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

  async function setAuth({
    token,
    onboardingCompleted,
  }: {
    token: string;
    onboardingCompleted: boolean;
  }) {
    try {
      const response = await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, onboardingCompleted }),
      });

      if (!response.ok) {
        throw new Error("Failed to set cookie");
      }
      setToken(token);
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  }
  async function removeAuth() {
    try {
      const response = await fetch("/api/auth/remove-cookie", {
        method: "POST",
        credentials: "include", // Include credentials for cookies
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
