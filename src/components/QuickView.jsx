import { useEffect } from "react";

export default function QuickView({ product, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white w-full 
          sm:max-w-lg md:h-auto 
          rounded-t-2xl sm:rounded-2xl 
          shadow-xl 
          overflow-hidden 
          animate-fadeIn
        "
      >
        <div className="h-52 sm:h-60 bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto max-h-[60vh]">
          <h2 className="text-base sm:text-lg font-bold">{product.title}</h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {product.brand} • {product.category}
          </p>

          <div className="flex items-center gap-1 mt-2 text-sm">
            ⭐ <span>{product.rating}</span>
          </div>

          <p className="text-green-600 text-lg sm:text-xl font-semibold mt-3">
            ${product.price}
          </p>

          <p
            className={`text-xs sm:text-sm mt-1 ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </p>

          <p className="text-gray-600 text-xs sm:text-sm mt-3 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-5 flex flex-col sm:flex-row justify-end gap-2">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
            >
              Close
            </button>

            <button className="w-full sm:w-auto px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
