"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import API from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    API.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUser(res.data))
      .catch(() => logout());
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
