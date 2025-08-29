interface CartBook {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  quantity: number;
}

export default function CartItem({
  book,
  onRemove,
  onQuantityChange,
}: {
  book: CartBook;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}) {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <div className="flex items-center space-x-4">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-16 h-20 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-lg">{book.title}</h3>
          <p className="text-sm text-gray-500">{book.author}</p>
          <p className="text-sm font-medium">₹{book.price}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="number"
          min={1}
          value={book.quantity}
          onChange={(e) =>
            onQuantityChange(book._id, parseInt(e.target.value) || 1)
          }
          className="w-16 border rounded text-center"
        />
        <button
          onClick={() => onRemove(book._id)}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
