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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/input-otp";
import {
  type ConfirmFormInput,
  confirmFormSchema,
  defaultConfirm,
} from "@repo/validators/forms/auth.schema";

interface ConfirmationFormProps {
  onValid: (data: ConfirmFormInput) => void;
}

export default function ConfirmationForm({ onValid }: ConfirmationFormProps) {
  const form = useForm({
    schema: confirmFormSchema,
    defaultValues: defaultConfirm,
  });

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onValid)(e)}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Confirmation</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
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
        <FormFooter>
          <ResetButton />
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
