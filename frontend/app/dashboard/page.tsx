"use client";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  date: string;
  total: number;
  items: { _id: string; title: string; quantity: number; price: number }[];
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow bg-white"
            >
              <p className="font-semibold text-gray-600">
                Order ID: {order.id} |{" "}
                {new Date(order.date).toLocaleString()}
              </p>
              <ul className="mt-2 space-y-1 text-gray-700">
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.title} × {item.quantity} — ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold text-gray-500">
                Total: ₹{order.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
