import { signIn } from "@/app/api/services/auth/auth.service";
import type { SignInType } from "@/app/api/services/auth/schemas/sign-in.schema";
import { LoginForm } from "@/components/login-form";

export function SignInPage() {
  const login = async (data: SignInType) => {
    const signInResponse = await signIn(data);
    if (!signInResponse.isOK) {
      console.log("Failed to sign in", signInResponse.error);
      return;
    }

    console.log(signInResponse.data);
    window.localStorage.setItem("access_token", signInResponse.data.token);
  };
  return <LoginForm onLogin={login} />;
}
