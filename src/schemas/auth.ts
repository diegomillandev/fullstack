import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.email("The email address is invalid."),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const SigninSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(1, "Password is required"),
});
