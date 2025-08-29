"use client";
import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import { useRouter } from "next/navigation";

interface CartBook {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartBook[]>([]);
  const router = useRouter();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    // Save orders to localStorage (mock backend for now)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      total: totalCost,
      date: new Date().toISOString(),
    };
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    // Clear cart
    setCartItems([]);
    localStorage.removeItem("cart");

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((book) => (
            <CartItem
              key={book._id}
              book={book}
              onRemove={removeFromCart}
              onQuantityChange={updateQuantity}
            />
          ))}

          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-lg font-semibold">Total: ₹{totalCost}</p>
            <button
              onClick={placeOrder}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
