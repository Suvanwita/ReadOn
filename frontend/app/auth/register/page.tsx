"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registered! Please login.");
      router.replace("/auth/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Create account</h2>
      <p className="text-gray-700 mb-4">Join Book Tracker in seconds.</p>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          required
          placeholder="Name"
          className="w-full border rounded p-2 text-gray-700"
          value={name} onChange={(e)=>setName(e.target.value)}
        />
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full border rounded p-2 text-gray-700"
          value={email} onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="w-full border rounded p-2 text-gray-700"
          value={password} onChange={(e)=>setPassword(e.target.value)}
        />
        {error && <p className="text-red-700 text-sm">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-gray-700 mt-3">
        Already have an account? <a className="text-blue-600 underline" href="/auth/login">Login</a>
      </p>
    </div>
  );
}
