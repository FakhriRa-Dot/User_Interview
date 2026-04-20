import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import QuickView from "../components/QuickView";
import SearchModal from "../components/SearchModal";
import { useProducts } from "../hooks/useProduct";

export default function ProductPage({ openSearch, setOpenSearch }) {
  const {
    products,
    allProducts,
    categories,
    loading,
    setCategory,
    setSort,
    page,
    setPage,
    total,
    setSearch,
    search,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      {search && (
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">Search: "{search}"</p>
          <button
            onClick={() => setSearch("")}
            className="text-sm text-green-600"
          >
            Clear
          </button>
        </div>
      )}

      <CategoryFilter
        categories={categories}
        onSelect={setCategory}
        onSort={setSort}
      />

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-4">
          {[...Array(16)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => setSelectedProduct(p)}
            />
          ))}
        </div>
      )}

      <Pagination page={page} onChange={setPage} total={total} />

      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {openSearch && (
        <SearchModal
          onClose={() => setOpenSearch(false)}
          setSearch={setSearch}
          allProducts={allProducts}
          onSelectProduct={(product) => {
            setSelectedProduct(product);
            setSearch("");
          }}
        />
      )}
    </div>
  );
}
