import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/dashboard/logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (typeof userId !== "string") {
    redirect("/auth/login");
  }

  const email =
    typeof data?.claims?.email === "string" ? data.claims.email : undefined;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold">
            1manuelcdev
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Dashboard</span>
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Ver site</Link>
            </Button>
            <LogoutButton userId={userId} email={email} />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
