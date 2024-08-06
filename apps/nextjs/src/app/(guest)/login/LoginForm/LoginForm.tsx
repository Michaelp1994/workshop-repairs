"use client";
import type { LoginFormInput } from "@repo/validators/forms/auth.schema";

import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  SubmitButton,
  useForm,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { defaultLogin, loginFormSchema } from "./schema";
import { login } from "./server-action";

export default function LoginForm() {
  const form = useForm({
    schema: loginFormSchema,
    defaultValues: defaultLogin,
  });

  async function handleValid(data: LoginFormInput) {
    await login(data);
    router.push("/dashboard");
  }

  const router = useRouter();
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
        <FormField
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <SubmitButton />
        <Button asChild variant="link">
          <Link href="/forgot-password">Forgot password?</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/register">Register</Link>
        </Button>
      </form>
    </Form>
  );
}
