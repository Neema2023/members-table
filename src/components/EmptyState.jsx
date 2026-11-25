export function EmptyState({ onClear }) {
  return (
    <div className="p-12 text-center">
      <p className="text-lg font-medium text-slate-700">No members found</p>
      <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
      <button
        onClick={onClear}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Clear search & filters
      </button>
    </div>
  );
}

export function SkeletonRow({ columns }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        </td>
      ))}
    </tr>
  );
}