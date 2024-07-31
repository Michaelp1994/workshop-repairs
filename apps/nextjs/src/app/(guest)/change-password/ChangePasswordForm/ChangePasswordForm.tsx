import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import Link from "next/link";

import { useChangePasswordForm } from "./useChangePasswordForm";

export default function ChangePasswordForm() {
  const form = useChangePasswordForm();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="newPassword"
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
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          );
        }}
      />

      <Button type="submit">Login</Button>
      <Button asChild variant="link">
        <Link href="/forgot-password">Forgot password?</Link>
      </Button>
    </Form>
  );
}
