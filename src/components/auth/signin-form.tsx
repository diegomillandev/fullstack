import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "@/schemas/auth";
import { SigninInput } from "@/types/auth";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/router";
import { LoadingIcon } from "@/components/shared";

export const SignInForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit = async (data: SigninInput) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Logged in successfully");
          reset();
          router.push("/");
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3 relative">
                <div className="flex justify-between">
                  <Label htmlFor="email">Email</Label>
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email?.message?.toString()}
                    </p>
                  )}
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="millan@example.com"
                  className="placeholder:text-foreground/30"
                  {...register("email")}
                  required
                  autoFocus
                />
              </div>
              <div className="grid gap-3 relative">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <p className="text-xs text-red-500">
                    {errors.password?.message?.toString()}
                  </p>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="placeholder:text-foreground/30"
                  required
                  {...register("password")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <LoadingIcon /> : null}
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
