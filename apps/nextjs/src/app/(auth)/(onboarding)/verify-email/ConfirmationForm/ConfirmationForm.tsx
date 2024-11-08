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
  useForm,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import {
  type ConfirmFormInput,
  confirmFormSchema,
  defaultConfirm,
} from "@repo/validators/forms/auth.schema";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";

export default function ConfirmationForm() {
  const router = useRouter();
  const form = useForm({
    schema: confirmFormSchema,
    defaultValues: defaultConfirm,
  });

  const confirmMutation = api.auth.confirmEmail.useMutation({
    async onSuccess(values) {
      await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwtToken: values.token }),
      });
      router.push("/onboarding");
    },
  });

  async function handleValid(data: ConfirmFormInput) {
    await confirmMutation.mutateAsync({
      code: data.otp,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>One Time Password</FormLabel>
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
          <SubmitButton isLoading={confirmMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
