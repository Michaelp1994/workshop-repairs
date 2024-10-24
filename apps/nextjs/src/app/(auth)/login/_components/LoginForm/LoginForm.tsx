"use client";
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
import {
  defaultLogin,
  type LoginFormInput,
  loginFormSchema,
} from "@repo/validators/forms/auth.schema";
import { useState } from "react";

import { login } from "~/app/actions";

export default function LoginForm() {
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm({
    schema: loginFormSchema,
    defaultValues: defaultLogin,
  });

  async function handleValid(data: LoginFormInput) {
    setMessage(null);
    const result = await login(data);
    if (result?.message) {
      setMessage(result.message);
    }
  }

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

        {message && <div className="text-destructive">{message}</div>}

        <SubmitButton />
      </form>
    </Form>
  );
}
