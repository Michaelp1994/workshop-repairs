"use client";
import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
  const router = useRouter();
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(async (data) => {
          await login(data);
          router.push("/dashboard");
        })}
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

        <Button type="submit">Submit</Button>
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
