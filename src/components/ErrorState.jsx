export function ErrorState({ error, onRetry }) {
  return (
    <div className="p-12 text-center">
      <p className="text-lg font-medium text-red-700">Something went wrong</p>
      <p className="mt-1 text-sm text-slate-500">{error.message}</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Retry
      </button>
    </div>
  );
}