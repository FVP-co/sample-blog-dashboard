import z from "zod";

export const signUpSchema = z.object({
  email: z.email(),
  name: z.string().max(64),
  age: z.number().min(5).max(120),
  password: z
    .string()
    .trim()
    .max(32, "Password must not be more than 32")
    .min(8, "Password must be at least 8 characters"),
});

export type SignUpType = z.infer<typeof signUpSchema>;
