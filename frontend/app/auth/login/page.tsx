"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token: string = res.data?.token;
      if (!token) throw new Error("Token not received");
      setToken(token);
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-2">Login</h2>
      <p className="text-gray-500 mb-4">Use your account to continue.</p>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full border rounded p-2"
          value={email} onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="w-full border rounded p-2"
          value={password} onChange={(e)=>setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-3">
        No account? <a className="text-blue-600 underline" href="/auth/register">Register</a>
      </p>
    </div>
  );
}
