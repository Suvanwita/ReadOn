import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Book Tracker",
  description: "Track and shop books – MERN + Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto w-full max-w-6xl px-4 py-6 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
