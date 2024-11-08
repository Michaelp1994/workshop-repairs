import type { Metadata } from "next";

import { buttonVariants } from "@repo/ui/button";
import { cn } from "@repo/ui/utils";
import Link from "next/link";

import Logo from "~/app/(public)/components/PublicNavBar/Logo";

import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
        href="/register"
      >
        Register
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
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          </div>
          <LoginForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            By clicking continue, you agree to our
            <Link
              className="hover:text-primary underline underline-offset-4"
              href="/terms"
            >
              Terms of Service
            </Link>
            and
            <Link
              className="hover:text-primary underline underline-offset-4"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
