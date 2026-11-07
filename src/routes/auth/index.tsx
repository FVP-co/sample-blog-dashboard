import { AuthPage } from "@/pages/auth/auth.page";
import { authRedirectionService } from "@/guards/auth-redirection.guard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  component: AuthPage,
  loader: authRedirectionService,
});
