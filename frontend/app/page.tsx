"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <section className="text-center mt-14">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600">📚 ReadOn</h1>
      <p className="text-gray-600 mt-3">
        Browse books, add to cart, place orders, and manage your profile.
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <Link href="/auth/login" className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Login
        </Link>
        <Link href="/auth/register" className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600">
          Register
        </Link>
        <Link href="/books" className="px-5 py-2 rounded-lg border bg-gray-600 hover:bg-gray-800">
          View Books
        </Link>
      </div>
    </section>
  );
}
