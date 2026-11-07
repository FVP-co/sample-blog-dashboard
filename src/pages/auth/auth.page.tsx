import { Navigate } from "@tanstack/react-router";

export function AuthPage() {
  return <Navigate to="/auth/login" />;
}
