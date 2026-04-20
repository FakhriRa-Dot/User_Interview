export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-200" />

      <div className="p-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />

        <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />

        <div className="h-4 bg-gray-300 rounded w-1/4" />
      </div>
    </div>
  );
}
