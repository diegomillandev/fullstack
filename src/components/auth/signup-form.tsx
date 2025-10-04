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
import { SignupSchema } from "@/schemas/auth";
import { SignupInput } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingIcon, MessageError } from "@/components/shared";

export const SignUpForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    await signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
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
          toast.success("Account created successfully");
          reset();
          router.push("/sign-in");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-7">
              <div className="grid gap-2 relative">
                <Label htmlFor="email">Name</Label>
                <Input
                  className="placeholder:text-foreground/30"
                  id="name"
                  type="name"
                  placeholder="Millan"
                  autoFocus
                  {...register("name")}
                />
                {errors.name && (
                  <MessageError message={errors.name?.message?.toString()} />
                )}
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="placeholder:text-foreground/30"
                  id="email"
                  type="email"
                  placeholder="millan@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <MessageError message={errors.email?.message?.toString()} />
                )}
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="placeholder:text-foreground/30"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <MessageError
                    message={errors.password?.message?.toString()}
                  />
                )}
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                  className="placeholder:text-foreground/30"
                  id="password_confirmation"
                  type="password"
                  placeholder="Confirm your password"
                  {...register("password_confirmation")}
                />
                {errors.password_confirmation && (
                  <MessageError
                    message={errors.password_confirmation?.message?.toString()}
                  />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? <LoadingIcon /> : null}
                  Create Account
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
