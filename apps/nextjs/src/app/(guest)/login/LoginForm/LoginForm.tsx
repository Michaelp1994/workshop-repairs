"use client";
import Link from "next/link";
import { login } from "./server-action";
import { defaultLogin, loginFormSchema } from "./schema";
import {
  useForm,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useRouter } from "next/navigation";

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
        <Button variant="link" asChild>
          <Link href="/forgot-password">Forgot password?</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </form>
    </Form>
  );
}
