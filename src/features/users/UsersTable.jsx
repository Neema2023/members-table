import { SortableHeader } from "./SortableHeader";
import { SkeletonRow } from "../../components/EmptyState";

const COLUMNS = [
  { key: "firstName", label: "Name", sortable: true },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "age", label: "Age", sortable: true },
  { key: "gender", label: "Gender" },
  { key: "company", label: "Company" },
];

export function UsersTable({ data, params, isLoading, isFetching, isPlaceholderData, onSort }) {
  if (isLoading) {
    return (
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead>{/* headers */}</thead>
        <tbody>
          {Array.from({ length: params.pageSize }).map((_, i) => (
            <SkeletonRow key={i} columns={COLUMNS.length} />
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {COLUMNS.map((col) =>
              col.sortable ? (
                <SortableHeader
                  key={col.key}
                  column={col.key}
                  label={col.label}
                  sortBy={params.sortBy}
                  order={params.order}
                  onSort={onSort}
                />
              ) : (
                <th key={col.key} scope="col" className="px-4 py-3 text-left font-semibold">
                  {col.label}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody
          className={`divide-y divide-slate-100 ${
            isPlaceholderData ? "opacity-50" : ""
          } transition-opacity`}
        >
          {data.users.map((u) => (
            <tr key={u.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium">
                {u.firstName} {u.lastName}
              </td>
              <td className="px-4 py-3 text-slate-600">{u.email}</td>
              <td className="px-4 py-3 text-slate-600">{u.phone}</td>
              <td className="px-4 py-3">{u.age}</td>
              <td className="px-4 py-3 capitalize">{u.gender}</td>
              <td className="px-4 py-3 text-slate-600">{u.company?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}