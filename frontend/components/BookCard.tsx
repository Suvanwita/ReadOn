"use client";

import { api } from "@/lib/api";

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

export default function BookCard({ book, onChange }: { book: Book; onChange?: () => void }) {
  const addToCart = async () => {
    try {
      await api.post("/cart/add", { bookId: book._id, quantity: 1 });
      alert("Added to cart");
    } catch (e: any) {
      alert(e?.response?.data?.message || "Please login");
      window.location.href = "/auth/login";
    }
  };

  const deleteBook = async () => {
    if (!confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${book._id}`);
      onChange?.();
    } catch (e: any) {
      alert(e?.response?.data?.message || "Only admin can delete.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <a href={`/books/${book._id}`} className="block">
        <img
          src={book.coverImage || "https://via.placeholder.com/400x260?text=Book"}
          alt={book.title}
          className="w-full h-48 object-cover rounded"
        />
      </a>
      <div className="mt-3">
        <a href={`/books/${book._id}`} className="font-semibold text-lg hover:underline">
          {book.title}
        </a>
        <p className="text-gray-500">{book.author}</p>
        <p className="text-blue-600 font-semibold mt-2">₹{book.price}</p>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={addToCart}
          className="flex-1 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Add to Cart
        </button>
        <button
          onClick={deleteBook}
          className="px-3 py-2 rounded border text-red-600 hover:bg-white"
          title="Admin only"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
