"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Profile = { _id: string; name: string; email: string; isAdmin?: boolean };

export default function DashboardPage() {
  const [me, setMe] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const [u, o] = await Promise.all([
          api.get("/users/profile"),
          api.get("/orders"),
        ]);
        setMe(u.data);
        setOrders(o.data);
      } catch (e) {
        // middleware will redirect if not authed; this is fallback
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!me) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Welcome, {me.name} 👋</h1>
        <p className="text-gray-600">Email: {me.email}</p>
        {me.isAdmin && <p className="mt-2 inline-block text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">Admin</p>}
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <ul className="divide-y">
            {orders.map((o) => (
              <li key={o._id} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #{o._id}</p>
                    <p className="text-sm text-gray-500">
                      {o.books?.map((b: any) => `${b.book?.title} × ${b.quantity}`).join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{o.totalPrice}</p>
                    <p className="text-sm text-gray-500">{o.status}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
