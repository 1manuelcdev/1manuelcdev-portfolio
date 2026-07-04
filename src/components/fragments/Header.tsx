import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-2 left-0 w-full flex items-center justify-between px-4 md:px-12 py-4">
      <Link href="/" className="text-lg font-semibold">
        1manuelcdev
      </Link>

      {/* <nav className="hidden md:flex items-center gap-6">
        <Link
          href="#"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Home
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Products
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </Link>
      </nav> */}
    </header>
  );
}
