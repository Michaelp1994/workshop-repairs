import { auth } from "@repo/auth";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

import LoginForm from "./(guest)/login/_components/LoginForm/LoginForm";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }

  return (
    <main>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button asChild variant="ghost">
          <Link
            className="absolute right-4 top-4 md:right-8 md:top-8"
            href="/register"
          >
            Register
          </Link>
        </Button>
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              className="mr-2 h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg"></p>
              <footer className="text-sm"></footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-muted-foreground text-sm">
                Enter your details below to get started.
              </p>
            </div>
            <LoginForm />
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking continue, you agree to our{" "}
              <Link
                className="hover:text-primary underline underline-offset-4"
                href="/terms"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
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
    </main>
  );
}
