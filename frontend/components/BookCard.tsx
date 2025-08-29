"use client";
import { useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  description?: string;
  coverImage: string;
  publishedYear?: number;
  genre?: string;
  status?: string;
  price?: number;
}

export default function BookCard({ book }: { book: Book }) {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!existingCart.find((item: Book) => item._id === book._id)) {
      existingCart.push(book);
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }
    setAdded(true);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col w-full max-w-sm mx-auto">
      {/* Cover Image */}
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>

      {/* Author */}
      <p className="text-gray-600 italic mb-2">by {book.author}</p>

      {/* Status */}
      {book.status && (
        <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded mb-3">
          {book.status}
        </span>
      )}

      {/* Description */}
      {book.description && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
          {book.description}
        </p>
      )}

      {/* Extra Details */}
      <div className="text-sm text-gray-600 space-y-1 mb-4">
        {book.publishedYear && (
          <p>
            <span className="font-semibold">Published:</span>{" "}
            {book.publishedYear}
          </p>
        )}
        {book.genre && (
          <p>
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
        )}
      </div>

      {/* Price */}
      {book.price !== undefined && (
        <p className="text-lg font-bold text-green-700 mb-4">
          ₹ {book.price.toFixed(2)}
        </p>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        className={`mt-auto w-full px-4 py-2 rounded-lg text-white transition ${
          added ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {added ? "✔ Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
