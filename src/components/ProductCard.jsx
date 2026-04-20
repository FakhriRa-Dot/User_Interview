import { useState } from "react";

export default function ProductCard({ product, onClick }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition duration-300 overflow-hidden"
    >
      <div className="h-40 bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>

        <p className="text-gray-500 text-xs mt-1">{product.category}</p>

        <p className="text-green-600 font-bold mt-2">${product.price}</p>
      </div>

      {openSearch && (
        <SearchModal
          onClose={() => setOpenSearch(false)}
          setSearch={setSearch}
          allProducts={allProducts}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />
      )}
    </div>
  );
}
