export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-4 text-sm text-gray-600 text-center">
        © {new Date().getFullYear()} BookTracker • Built with Next.js + Tailwind
      </div>
    </footer>
  );
}
