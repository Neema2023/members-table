import { useQueryClient } from "@tanstack/react-query";
import { useTableParams } from "./hooks/useTableParams";
import { useUsers } from "./features/users/queries";
import { fetchUsers } from "./api/users";
import { UsersTable } from "./features/users/UsersTable";
import { TableToolbar } from "./features/users/TableToolbar";
import { TablePagination } from "./features/users/TablePagination";
import { EmptyState } from "./components/EmptyState";
import { ErrorState } from "./components/ErrorState";

export default function App() {
  const { params, update, clearFilters } = useTableParams();
  const queryClient = useQueryClient();

  const { 
    data, 
    isPending, 
    isError, 
    error, 
    refetch, 
    isFetching, 
    isPlaceholderData 
  } = useUsers(params);

  // Prefetch the next page
  if (data && params.page * params.pageSize < data.total) {
    const nextParams = { ...params, page: params.page + 1 };
    queryClient.prefetchQuery({
      queryKey: ["users", "list", nextParams],
      queryFn: () => fetchUsers(nextParams),
    });
  }

  const handleSort = (column) => {
    if (params.sortBy === column) {
      update({
        order: params.order === "asc" ? "desc" : "asc",
      });
    } else {
      update({ sortBy: column, order: "asc" });
    }
  };

  return (
    // Added pb-20 for bottom spacing
    <main className="mx-auto max-w-6xl p-6 min-h-screen bg-slate-50 text-slate-900 pb-20">
      <header className="mb-6 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Abanyamuryango</h1>
        {isFetching && !isPending && (
          <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 animate-pulse">
            Updating…
          </span>
        )}
      </header>

      <TableToolbar 
        params={params} 
        total={data?.total ?? 0} 
        update={update} 
      />

      {isError ? (
        <ErrorState error={error} onRetry={() => refetch()} />
      ) : data && data.users.length === 0 && !isPending ? (
        <EmptyState onClear={clearFilters} />
      ) : (
        <div className="space-y-4">
          <UsersTable
            data={data ?? { users: [] }}
            params={params}
            isLoading={isPending}
            isFetching={isFetching}
            isPlaceholderData={isPlaceholderData}
            onSort={handleSort}
          />
          
          {/* Render Pagination if we have data and more than 0 total results */}
          {data && data.total > 0 && (
            <TablePagination
              page={params.page}
              pageSize={params.pageSize}
              total={data.total}
              onChange={(p) => update({ page: p })}
            />
          )}
        </div>
      )}
    </main>
  );
}