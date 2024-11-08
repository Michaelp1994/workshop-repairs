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
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = api.auth.login.useMutation({
    async onSuccess(values) {
      // router.push("/dashboard");
    },
  });
  const form = useForm({
    schema: loginFormSchema,
    defaultValues: defaultLogin,
  });

  async function handleValid(data: LoginFormInput) {
    await loginMutation.mutateAsync(data);
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

        <SubmitButton isLoading={loginMutation.isPending} />
      </form>
    </Form>
  );
}
