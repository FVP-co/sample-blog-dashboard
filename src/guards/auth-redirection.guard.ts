import { redirect } from "@tanstack/react-router";

/**
 * Handles auth redirection based on the presence of an access token in local storage.
 */
export function authRedirectionService() {
  const accessToken = window.localStorage.getItem("access_token");
  if (!accessToken) throw redirect({ to: "/auth/login" });
  throw redirect({ to: "/dashboard" });
}
