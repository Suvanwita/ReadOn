"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/api";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await getCart();
        setCartCount(data.length);
      } catch {
        setCartCount(0);
      }
    }
    fetchCart();
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        📖 ReadOn
      </Link>
      <div className="space-x-6 flex items-center">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/books">Books</Link>
        <Link href="/cart" className="relative">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        <Link href="/auth/login">Login</Link>
      </div>
    </nav>
  );
}
