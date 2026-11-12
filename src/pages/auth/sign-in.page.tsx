import { signIn } from "@/app/api/services/auth/auth.service";
import type { SignInType } from "@/app/api/services/auth/schemas/sign-in.schema";
import { LoginForm } from "@/components/login-form";
import { useAuthentication } from "@/hooks/use-authentication";

export function SignInPage() {
  const onAuthentication = useAuthentication();

  const login = async (data: SignInType) => {
    const signInResponse = await signIn(data);
    if (!signInResponse.isOK) return signInResponse.error.showToast();
    onAuthentication(signInResponse.data);
  };
  return <LoginForm onLogin={login} />;
}
