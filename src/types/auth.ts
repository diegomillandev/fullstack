import { SigninSchema, SignupSchema } from "@/schemas/auth";
import { z } from "zod";

export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  requiredRole: "ADMIN" | "USER" | null;
  isActive?: boolean;
}

export interface NavCardItem {
  title: string;
  description: string;
  href: string;
  requiredRole: "ADMIN" | "USER" | null;
  icon: React.ElementType;
}
