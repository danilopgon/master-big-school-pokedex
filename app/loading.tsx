export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 md:px-6">
      <p className="sr-only" role="status" aria-live="polite">
        Loading content
      </p>
      <div className="h-10 w-80 animate-pulse rounded-lg bg-slate-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-xl bg-slate-200" />
        ))}
      </div>
    </main>
  );
}
