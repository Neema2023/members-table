export function SortableHeader({ column, label, sortBy, order, onSort }) {
  const isActive = sortBy === column;
  const ariaSort = isActive ? (order === "asc" ? "ascending" : "descending") : "none";

  return (
    <th scope="col" aria-sort={ariaSort} className="px-4 py-3 text-left font-semibold">
      <button
        type="button"
        onClick={() => onSort(column)}
        className="inline-flex items-center gap-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {label}
        <span aria-hidden="true" className="text-xs text-slate-400">
          {isActive ? (order === "asc" ? "▲" : "▼") : "↕"}
        </span>
      </button>
    </th>
  );
}