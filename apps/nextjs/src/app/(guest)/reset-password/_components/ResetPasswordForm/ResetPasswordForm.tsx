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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/input-otp";
import { toast } from "@repo/ui/sonner";
import {
  defaultResetPassword,
  type ResetPasswordFormInput,
  resetPasswordFormSchema,
} from "@repo/validators/forms/auth.schema";
import { useRouter, useSearchParams } from "next/navigation";

import { api } from "~/trpc/react";

interface ResetPasswordFormProps {}

export default function ResetPasswordForm({}: ResetPasswordFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  if (!email) {
    router.push("/forgot-password");
    return null;
  }

  const resetMutation = api.auth.resetPassword.useMutation({
    async onSuccess(data) {
      // TODO: login user
    },
    onError(error) {
      toast.error("Password reset failed");
      console.log(error);
    },
  });

  const form = useForm({
    schema: resetPasswordFormSchema,
    defaultValues: defaultResetPassword,
  });

  async function handleValid(data: ResetPasswordFormInput) {
    await resetMutation.mutateAsync({ ...data, email: email! });
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <div className="flex justify-center">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      onComplete={form.handleSubmit}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <FormFooter>
          <ResetButton />
          <SubmitButton isLoading={resetMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
