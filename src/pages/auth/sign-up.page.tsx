import { SignupForm } from "@/components/signup-form";
import { useAuthentication } from "@/hooks/use-authentication";
import { singUp } from "@/app/api/services/auth/auth.service";
import type { SignUpType } from "@/app/api/services/auth/schemas/sign-up.schema";

export function SignUpPage() {
  const onAuthentication = useAuthentication();
  const register = async (data: SignUpType) => {
    const response = await singUp(data);
    if (!response.isOK) return response.error.showToast();
    onAuthentication(response.data);
  };

  return <SignupForm onSubmit={register} signInUrl="/auth/login" />;
}
