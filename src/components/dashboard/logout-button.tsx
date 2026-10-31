"use client";

import { useEffect, useTransition } from "react";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/dashboard/actions";

interface LogoutButtonProps {
  userId: string;
  email?: string;
}

export function LogoutButton({ userId, email }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();
  const isPostHogConfigured =
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) &&
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_HOST);

  useEffect(() => {
    if (isPostHogConfigured && posthog.get_distinct_id() !== userId) {
      posthog.identify(userId, email ? { email } : undefined);
    }
  }, [email, isPostHogConfigured, userId]);

  const handleLogout = () => {
    if (isPostHogConfigured) {
      posthog.capture("user_logged_out");
      posthog.reset();
    }
    startTransition(() => logout());
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      onClick={handleLogout}
    >
      {isPending ? "Saindo..." : "Sair"}
    </Button>
  );
}
