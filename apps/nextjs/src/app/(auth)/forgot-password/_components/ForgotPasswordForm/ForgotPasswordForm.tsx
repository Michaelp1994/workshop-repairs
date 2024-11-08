"use client";
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
import { toast } from "@repo/ui/sonner";
import {
  defaultLogin,
  type ForgotPasswordFormInput,
  forgotPasswordFormSchema,
} from "@repo/validators/forms/auth.schema";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
export default function ForgotPasswordForm() {
  const router = useRouter();
  const forgotPasswordMutation = api.auth.forgotPassword.useMutation({
    onSuccess(_, variables) {
      router.push(`/reset-password?email=${variables.email}`);
    },
    onError(error) {
      toast.error("Error, please try again later.");
      console.log(error);
    },
  });

  const form = useForm({
    schema: forgotPasswordFormSchema,
    defaultValues: defaultLogin,
  });

  async function handleValid(data: ForgotPasswordFormInput) {
    await forgotPasswordMutation.mutateAsync(data);
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
