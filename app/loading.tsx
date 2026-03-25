export default function Loading() {
  return (
    <div className="section py-4">
      <div className="animate-pulse space-y-5 rounded-3xl border border-gray-200 dark:border-white/10 bg-secondary/55 p-7 sm:p-10">
        <div className="h-8 w-2/3 rounded-lg bg-gray-100 dark:bg-white/10" />
        <div className="h-4 w-full rounded-lg bg-gray-100 dark:bg-white/10" />
        <div className="h-4 w-5/6 rounded-lg bg-gray-100 dark:bg-white/10" />
        <div className="grid gap-4 pt-4 sm:grid-cols-2">
          <div className="h-36 rounded-2xl bg-gray-100 dark:bg-white/10" />
          <div className="h-36 rounded-2xl bg-gray-100 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}
