import { ReactElement } from "react";
import AuthLayout from "@/components/layouts/auth-layout";
import { SignInForm } from "@/components/auth/signin-form";

export default function Signin() {
  return <SignInForm />;
}

Signin.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
