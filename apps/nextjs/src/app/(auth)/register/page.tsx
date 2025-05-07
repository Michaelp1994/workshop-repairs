import type { Metadata } from "next";

import { buttonVariants } from "@repo/ui/button";
import { cn } from "@repo/ui/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

import isAuthenticated from "~/auth/isAuthenticated";
import Logo from "~/components/Logo";

import RegisterForm from "./_components/RegisterForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function RegisterPage() {
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }
  return (
    <div className="container relative mx-auto hidden h-screen flex-col items-center justify-center px-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
        href="/login"
      >
        Login
      </Link>
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Get started for free
            </h1>
            <p className="text-muted-foreground text-sm">
              No credit card required
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
