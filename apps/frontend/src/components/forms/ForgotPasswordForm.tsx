import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  ResetButton,
  SubmitButton,
} from "@repo/ui/form";
import { useForm } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import {
  defaultLogin,
  type ForgotPasswordFormInput,
  forgotPasswordFormSchema,
} from "@repo/validators/client/auth.schema";
import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";
export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const forgotPasswordMutation = api.auth.forgotPassword.useMutation({
    async onSuccess(_, variables) {
      await navigate({
        to: "/reset-password",
        search: { email: variables.email },
      });
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    schema: forgotPasswordFormSchema,
    defaultValues: defaultLogin,
  });

  function handleValid(data: ForgotPasswordFormInput) {
    forgotPasswordMutation.mutate(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
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
        <FormFooter>
          <ResetButton />
          <SubmitButton isLoading={forgotPasswordMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
