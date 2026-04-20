import { useState } from "react";

export default function CategoryFilter({ categories, onSelect, onSort }) {
  const [active, setActive] = useState("all");
  const [showMore, setShowMore] = useState(false);

  const visibleCategories = categories.slice(0, 5);
  const moreCategories = categories.slice(5);

  const handleClick = (cat) => {
    setActive(cat);
    onSelect(cat);
    setShowMore(false);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => handleClick("all")}
          className={`px-3 py-2 text-xs sm:text-sm whitespace-nowrap rounded-full border transition min-h-[36px]
            ${active === "all" ? "bg-black text-white" : "hover:bg-gray-100"}
          `}
        >
          All
        </button>

        {visibleCategories?.map((cat) => {
          if (!cat.slug) return null;

          return (
            <button
              key={cat.slug}
              onClick={() => handleClick(cat.slug)}
              className={`px-3 py-2 text-xs sm:text-sm whitespace-nowrap rounded-full border transition capitalize min-h-[36px]
                ${
                  active === cat.slug
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
        <div className="relative">
          {moreCategories.length > 0 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-3 py-2 rounded-full border hover:bg-gray-100 min-h-[36px]"
            >
              More
            </button>
          )}

          {showMore && (
            <div className="absolute left-0 md:right-0 md:left-auto mt-2 bg-white shadow-lg rounded-xl p-3 z-10 w-56 sm:w-64">
              <div className="grid grid-cols-2 gap-2">
                {moreCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleClick(cat.slug)}
                    className={`text-left px-3 py-2 rounded-md text-xs sm:text-sm capitalize
                      ${
                        active === cat.slug
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }
                    `}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <select
          onChange={(e) => onSort(e.target.value)}
          className="border rounded-full px-3 py-2 text-xs sm:text-sm min-h-[36px]"
        >
          <option value="">Recommended</option>
          <option value="low">Price Low</option>
          <option value="high">Price High</option>
        </select>
      </div>
    </div>
  );
}
