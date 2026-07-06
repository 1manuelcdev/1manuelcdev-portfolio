export function ProjectsSkeleton() {
  return (
    <div className="p-4 pt-6 md:p-8 md:pt-12 flex flex-col items-center justify-center gap-1 animate-fade-in">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="h-6 w-40 rounded-md bg-muted animate-pulse" />
        <div className="h-4 w-52 rounded-md bg-muted animate-pulse animate-fade-in-delay" />
      </div>
      <div className="mt-6 w-full flex flex-wrap gap-5 items-center justify-center">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-full max-w-80 rounded-xl border bg-card p-3 flex flex-col gap-3 animate-fade-in-delay-2">
            <div className="h-45 w-full rounded-md bg-muted animate-pulse" />
            <div className="flex flex-col gap-2 px-1">
              <div className="h-5 w-32 rounded-md bg-muted animate-pulse" />
              <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
              <div className="h-4 w-3/4 rounded-md bg-muted animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
