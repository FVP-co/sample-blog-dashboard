import type { AuthType } from "@/app/api/services/auth/types/auth.type";
import { toast } from "@/components/ui/toast";
import { useNavigate } from "@tanstack/react-router";

export function useAuthentication() {
  const navigate = useNavigate();
  return (data: AuthType) => {
    toast.add({
      title: `Welcome back ${data.name} !`,
      description: "Nice to see you again, you have successfully logged in.",
      type: "success",
      timeout: 3000,
    });
    window.localStorage.setItem("access_token", data.token);
    navigate({ to: "/dashboard" });
  };
}
