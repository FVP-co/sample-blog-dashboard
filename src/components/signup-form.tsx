import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState, type PropsWithChildren } from "react";
import {
  type SignUpType,
  signUpSchema,
} from "@/app/api/services/auth/schemas/sign-up.schema";
import z from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ButtonGroup } from "./ui/button-group";

type SignupFormProps = PropsWithChildren & {
  className?: string;
  signInUrl?: string;
  onSubmit?: (data: SignUpType) => Promise<unknown>;
};

export function SignupForm({ className, ...props }: SignupFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: e.currentTarget.user_name.value as string,
      age: e.currentTarget.age.valueAsNumber as number,
      email: e.currentTarget.email.value as string,
      password: e.currentTarget.password.value as string,
      confirmPassword: e.currentTarget["confirm-password"].value as string,
    };
    if (data.password !== data.confirmPassword) {
      return console.log("Passwords do not match");
    }
    const validate = await z.validateAsync(signUpSchema, data);
    if (!validate) return console.log("Incorrect");
    setIsLoading(true);
    try {
      await props.onSubmit?.({
        age: data.age,
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className={cn("flex flex-col gap-6", className)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            name="user_name"
            type="text"
            placeholder="John Doe"
            disabled={isLoading}
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="age">Age</FieldLabel>
          <Input
            id="age"
            name="age"
            type="number"
            min={0}
            required
            disabled={isLoading}
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
            disabled={isLoading}
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <ButtonGroup className="h-full">
            <Input
              id="password"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              required
              disabled={isLoading}
              className="bg-background"
            />

            <Button
              type="button"
              variant="ghost"
              aria-haspopup
              size="icon"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className={"bg-background size-8 border border-background group"}
            >
              {isPasswordVisible ? (
                <EyeIcon className="size-4 group-active:opacity-90 group-active:scale-90 transition-all" />
              ) : (
                <EyeOffIcon className="size-4 group-active:opacity-90 group-active:scale-90 transition-all" />
              )}
            </Button>
          </ButtonGroup>
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirm-password"
            type={isPasswordVisible ? "text" : "password"}
            required
            disabled={isLoading}
            className="bg-background"
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Sign up with GitHub
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href={props.signInUrl}>Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
