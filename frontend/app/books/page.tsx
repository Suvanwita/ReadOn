"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import BookCard from "@/components/BookCard";

type Book = {
  _id: string;
  title: string;
  author: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  coverImage?: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Books</h1>
        <a href="/books/add" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          Add Book (Admin)
        </a>
      </div>

      {books.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <BookCard key={b._id} book={b} onChange={fetchBooks} />
          ))}
        </div>
      )}
    </section>
  );
}
