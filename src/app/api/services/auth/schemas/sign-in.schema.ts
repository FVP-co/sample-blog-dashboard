import z from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .trim()
    .max(32, "Password must not be more than 32")
    .min(8, "Password must be at least 8 characters"),
});

export type SignInType = z.infer<typeof signInSchema>;
