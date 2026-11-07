import { cn } from "cn";

import {
  signInSchema,
  type SignInType,
} from "@/app/api/services/auth/schemas/sign-in.schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import type React from "react";
import { useState, type PropsWithChildren } from "react";
import z from "zod";
import { Loader2Icon } from "lucide-react";

type LoginFormProps = PropsWithChildren & {
  className?: string;
  signUpUrl?: string;
  onLogin?: (data: SignInType) => Promise<unknown>;
};

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: SignInType = {
      email: e.currentTarget.email.value as string,
      password: e.currentTarget.password.value as string,
    };
    const validate = await z.validateAsync(signInSchema, data);
    if (!validate) return console.log("Incorrect");

    if (!props.onLogin) return;

    setIsLoading(true);
    try {
      await props.onLogin(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFormSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={isLoading}
                  name="email"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  disabled={isLoading}
                  id="password"
                  type="password"
                  required
                  name="password"
                />
              </Field>
              <Field>
                <Button disabled={isLoading} type="submit">
                  {isLoading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <>Login</>
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    disabled={isLoading}
                    to={props.signUpUrl || "/auth/register"}
                  >
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
