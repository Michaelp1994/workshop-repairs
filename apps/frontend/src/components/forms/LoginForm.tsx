import { ErrorAlert } from "@repo/ui/error-alert";
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
} from "@repo/validators/client/auth.schema";
import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function LoginForm() {
  const navigate = useNavigate();
  const utils = api.useUtils();
  const loginMutation = api.auth.login.useMutation({
    async onSuccess(values) {
      await utils.invalidate();
      console.log(values);
      if (!values.onboardingCompleted) {
        await navigate({ to: "/onboarding" });
      } else {
        await navigate({ to: "/dashboard" });
      }
      toast.success("Logged in!");
    },
    onError(errors) {
      displayMutationErrors(errors, form);
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
