export function ExperienceSkeleton() {
  return (
    <div className="p-4 pt-6 md:p-8 md:pt-12 flex flex-col items-center justify-center gap-1 animate-fade-in">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="h-6 w-48 rounded-md bg-muted animate-pulse" />
        <div className="h-4 w-36 rounded-md bg-muted animate-pulse animate-fade-in-delay" />
      </div>
      <div className="mt-6 w-full max-w-3xl flex flex-col items-center gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full flex flex-col gap-2 animate-fade-in-delay-2">
            <div className="flex flex-col gap-2">
              <div className="h-5 w-64 rounded-md bg-muted animate-pulse" />
              <div className="h-4 w-48 rounded-md bg-muted animate-pulse" />
              <div className="h-4 w-32 rounded-md bg-muted animate-pulse" />
            </div>
            <div className="h-16 w-full rounded-md bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
