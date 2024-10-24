import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import Link from "next/link";

import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your details below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button asChild variant="link">
          <Link href="/forgot-password">Forgot password?</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/register">Register</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
