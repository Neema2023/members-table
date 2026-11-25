import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

export function TableToolbar({ params, total, update }) {
  const [searchInput, setSearchInput] = useState(params.q);
  const debouncedQ = useDebounce(searchInput, 400);

  // Sync input → URL
  useEffect(() => {
    if (debouncedQ !== params.q) {
      update({ q: debouncedQ, gender: "" }); // search clears gender (API limitation)
    }
  }, [debouncedQ, params.q, update]);

  // Sync URL → input (e.g., browser back)
  useEffect(() => {
    setSearchInput(params.q);
  }, [params.q]);

  const showingFrom = (params.page - 1) * params.pageSize + 1;
  const showingTo = Math.min(params.page * params.pageSize, total);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-64">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search members…"
          aria-label="Search members"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        {searchInput && (
          <button
            type="button"
            onClick={() => setSearchInput("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* Gender filter */}
      <select
        value={params.gender}
        onChange={(e) => update({ gender: e.target.value, q: "" })}
        aria-label="Filter by gender"
        className="rounded-lg border border-slate-300 px-3 py-2"
      >
        <option value="">All genders</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>

      {/* Page size */}
      <select
        value={params.pageSize}
        onChange={(e) => update({ pageSize: Number(e.target.value) })}
        aria-label="Rows per page"
        className="rounded-lg border border-slate-300 px-3 py-2"
      >
        {[10, 20, 50].map((n) => (
          <option key={n} value={n}>
            {n} / page
          </option>
        ))}
      </select>

      <p className="text-sm text-slate-600" aria-live="polite">
        Showing {total === 0 ? 0 : showingFrom}–{showingTo} of {total}{" "}
        {params.q ? `results for "${params.q}"` : "members"}
      </p>

      {params.q && params.gender && (
        <p className="text-xs text-amber-600">
          Search and gender filter can't combine — pick one.
        </p>
      )}
    </div>
  );
}