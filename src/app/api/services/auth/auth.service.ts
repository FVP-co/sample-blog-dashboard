import { httpRequest } from "../../http/http.helper";
import type { SignInType } from "./schemas/sign-in.schema";
import type { SignUpType } from "./schemas/sign-up.schema";
import type { AuthType } from "./types/auth.type";

export async function signIn(data: SignInType) {
  const response = await httpRequest<AuthType>({
    method: "POST",
    data,
    url: "/auth/sign-in",
  });
  return response;
}

export async function singUp(data: SignUpType) {
  return httpRequest<AuthType>({
    method: "POST",
    data,
    url: "/auth/sign-up",
  });
}
