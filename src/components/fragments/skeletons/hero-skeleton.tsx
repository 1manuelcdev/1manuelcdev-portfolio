export function HeroSkeleton() {
  return (
    <div className="h-170 relative flex flex-col items-center gap-12 justify-center animate-fade-in">
      <div className="w-full max-w-sm md:max-w-4xl px-4 flex flex-col items-start gap-4">
        <div className="flex flex-col items-start gap-4">
          <div className="h-12 w-80 rounded-md bg-muted animate-pulse" />
          <div className="h-5 w-96 max-w-full rounded-md bg-muted animate-pulse animate-fade-in-delay" />
          <div className="h-5 w-72 max-w-full rounded-md bg-muted animate-pulse animate-fade-in-delay-2" />
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="size-6 rounded bg-muted animate-pulse animate-fade-in-delay" />
          <div className="size-6 rounded bg-muted animate-pulse animate-fade-in-delay" />
          <div className="size-6 rounded bg-muted animate-pulse animate-fade-in-delay" />
        </div>
      </div>
    </div>
  );
}
