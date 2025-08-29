"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

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

export default function BookDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const run = async () => {
      const res = await api.get(`/books/${params.id}`);
      setBook(res.data);
    };
    run();
  }, [params.id]);

  const addToCart = async () => {
    try {
      await api.post("/cart/add", { bookId: book?._id, quantity: 1 });
      alert("Added to cart");
    } catch (e: any) {
      alert(e?.response?.data?.message || "Please login");
      router.push("/auth/login");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow p-4">
        <img
          src={book.coverImage || "https://via.placeholder.com/600x400?text=Book+Cover"}
          alt={book.title}
          className="w-full h-80 object-cover rounded"
        />
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-gray-600 mt-1">by {book.author}</p>
        <p className="mt-4">{book.description || "No description provided."}</p>
        <p className="mt-4 text-xl font-semibold text-blue-600">₹{book.price}</p>
        <p className="text-sm text-gray-500">In stock: {book.stock}</p>

        <div className="mt-6 flex gap-3">
          <button onClick={addToCart} className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to Cart
          </button>
          <a href="/books" className="px-5 py-2 border rounded hover:bg-white">Back</a>
        </div>
      </div>
    </div>
  );
}
