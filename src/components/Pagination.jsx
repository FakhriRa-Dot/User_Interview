export default function Pagination({ page, onChange, total }) {
  const limit = 8;
  const totalPages = Math.ceil(total / limit);

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (end - start < maxVisible - 1) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisible - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return { pages, start, end };
  };

  const { pages, start, end } = getPages();

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-6 px-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="hidden sm:block px-3 py-1 text-sm text-gray-600 disabled:opacity-50"
      >
        Previous
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onChange(1)}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
          >
            1
          </button>
          {start > 2 && <span className="text-xs">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded ${
            p === page
              ? "text-green-600 border-b-2 border-green-600 font-semibold"
              : "text-gray-600"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-xs">...</span>}
          <button
            onClick={() => onChange(totalPages)}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="hidden sm:block px-3 py-1 text-sm text-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
