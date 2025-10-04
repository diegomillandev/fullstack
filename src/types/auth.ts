import { SigninSchema, SignupSchema } from "@/schemas/auth";
import { z } from "zod";

export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;
