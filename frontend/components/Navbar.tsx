"use client";

import Link from "next/link";
import { getToken, removeToken, parseJwt } from "@/lib/auth";
import { useEffect, useState } from "react";

type TokenPayload = { id: string; isAdmin?: boolean; exp: number };

export default function Navbar() {
  const [authed, setAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const t = getToken();
    setAuthed(!!t);
    if (t) {
      try {
        const payload = parseJwt<TokenPayload>(t);
        setIsAdmin(!!payload?.isAdmin);
      } catch {
        setIsAdmin(false);
      }
    }
  }, []);

  const logout = () => {
    removeToken();
    window.location.href = "/auth/login";
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold text-blue-600">BookTracker</Link>
        <div className="flex items-center gap-4">
          <Link href="/books" className="hover:underline">Books</Link>
          {isAdmin && <Link href="/books/add" className="hover:underline">Add Book</Link>}
          {authed ? (
            <>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:underline">Login</Link>
              <Link href="/auth/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
