"use client";
import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/input-otp";
import Link from "next/link";

import { useResetPasswordForm } from "./useResetPasswordForm";

export default function ResetPasswordForm() {
  const form = useResetPasswordForm();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="otp"
        render={({ field }) => {
          return (
            <FormItem>
              {/* <FormLabel>One-Time Password</FormLabel> */}
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
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <div>
        <Button asChild variant="outline">
          <Link href="/login">Return</Link>
        </Button>
        <Button type="submit">Verify</Button>
      </div>
    </Form>
  );
}
