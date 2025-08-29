"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    const token = getToken();
    if (token) {
      try {
        const res = await api.get("/users/profile");
        setUser(res.data);
      } catch {
        logout();
      }
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
