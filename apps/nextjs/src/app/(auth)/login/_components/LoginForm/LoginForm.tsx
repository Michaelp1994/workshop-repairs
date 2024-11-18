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
import { toast } from "@repo/ui/sonner";
import {
  defaultLogin,
  type LoginFormInput,
  loginFormSchema,
} from "@repo/validators/forms/auth.schema";
import { useRouter } from "next/navigation";

import ErrorAlert from "~/components/ErrorAlert";
import { api } from "~/trpc/client";
import displayFormErrors from "~/utils/displayFormErrors";

export default function LoginForm() {
  const router = useRouter();
  const utils = api.useUtils();
  const loginMutation = api.auth.login.useMutation({
    async onSuccess(values) {
      await utils.invalidate();
      if (values.onboardingCompleted) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
      toast.success("Logged in!");
    },
    async onError(errors) {
      displayFormErrors(errors, form);
    },
  });
  const form = useForm({
    schema: loginFormSchema,
    defaultValues: defaultLogin,
  });

  function handleValid(data: LoginFormInput) {
    loginMutation.mutate(data);
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
                  <Input autoComplete="email" {...field} />
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

        <ErrorAlert form={form} />

        <SubmitButton isLoading={loginMutation.isPending} />
      </form>
    </Form>
  );
}
