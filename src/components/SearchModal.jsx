import { useEffect, useState } from "react";

export default function SearchModal({
  onClose,
  setSearch,
  allProducts,
  onSelectProduct,
}) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recentSearch")) || [];
    setRecent(data);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!input) {
        setResults([]);
        return;
      }

      const keyword = input.toLowerCase();

      const filtered = allProducts
        .map((p) => {
          let score = 0;

          if (p.title.toLowerCase().includes(keyword)) score += 3;
          if (p.category.toLowerCase().includes(keyword)) score += 2;
          if (p.brand?.toLowerCase().includes(keyword)) score += 2;

          return { ...p, score };
        })
        .filter((p) => p.score > 0)
        .sort((a, b) => b.score - a.score);

      setResults(filtered.slice(0, 6));
      setSearch(input);
    }, 300);

    return () => clearTimeout(delay);
  }, [input, allProducts, setSearch]);

  const handleSelect = (value) => {
    const updated = [value, ...recent.filter((r) => r !== value)].slice(0, 6);

    setRecent(updated);
    localStorage.setItem("recentSearch", JSON.stringify(updated));

    setSearch(value);
    setInput(value);
  };

  const handleProductClick = (product) => {
    onSelectProduct(product);
    setInput("");
    onClose();
  };

  const clearAll = () => {
    setRecent([]);
    localStorage.removeItem("recentSearch");
  };

  const highlight = (text) => {
    const regex = new RegExp(`(${input})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-start pt-24"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border rounded-lg px-4 py-3">
          <input
            type="text"
            placeholder="Search products"
            className="w-full outline-none text-sm"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={onClose}>✕</button>
        </div>

        {input && (
          <div className="mt-4 max-h-72 overflow-y-auto space-y-2">
            {results.length > 0 ? (
              results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleProductClick(item)}
                  className="flex gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <img
                    src={item.thumbnail}
                    className="w-12 h-12 object-cover rounded"
                  />

                  <div>
                    <p
                      className="text-sm font-medium"
                      dangerouslySetInnerHTML={{
                        __html: highlight(item.title),
                      }}
                    />
                    <p className="text-xs text-gray-500">
                      {item.brand} • {item.category}
                    </p>
                    <p className="text-xs text-green-600 font-semibold">
                      ${item.price}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 p-2">No results found</p>
            )}
          </div>
        )}

        {!input && recent.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between">
              <h4 className="text-sm font-semibold">Recent</h4>
              <button onClick={clearAll} className="text-xs text-green-600">
                Clear all
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {recent.map((item) => (
                <span
                  key={item}
                  onClick={() => handleSelect(item)}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {!input && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3">Trending</h4>

            <div className="flex flex-wrap gap-2">
              {["Hoodie", "Jacket", "Shirt", "Sneakers"].map((item) => (
                <span
                  key={item}
                  onClick={() => handleSelect(item)}
                  className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
