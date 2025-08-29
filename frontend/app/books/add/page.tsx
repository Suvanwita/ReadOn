"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    coverImage: ""
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post("/books", form);
      alert("Book created");
      router.push("/books");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create book (Admin only)");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Title" required
               value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})}/>
        <input className="border p-2 rounded" placeholder="Author" required
               value={form.author} onChange={(e)=>setForm({...form, author: e.target.value})}/>
        <input className="border p-2 rounded sm:col-span-2" placeholder="Cover Image URL"
               value={form.coverImage} onChange={(e)=>setForm({...form, coverImage: e.target.value})}/>
        <textarea className="border p-2 rounded sm:col-span-2" placeholder="Description"
                  value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})}/>
        <input type="number" className="border p-2 rounded" placeholder="Price" required
               value={form.price} onChange={(e)=>setForm({...form, price: Number(e.target.value)})}/>
        <input type="number" className="border p-2 rounded" placeholder="Stock" required
               value={form.stock} onChange={(e)=>setForm({...form, stock: Number(e.target.value)})}/>
        <input className="border p-2 rounded sm:col-span-2" placeholder="Category"
               value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})}/>
        {error && <p className="text-red-600 text-sm sm:col-span-2">{error}</p>}
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 sm:col-span-2">
          Create
        </button>
      </form>
    </div>
  );
}
