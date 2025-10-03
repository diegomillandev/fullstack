import AuthLayout from "@/components/layouts/auth-layout";
import { ReactElement } from "react";
import { SignUpForm } from "@/components/auth/signup-form";

export default function Signup() {
  return <SignUpForm />;
}

Signup.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
