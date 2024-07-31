import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { useChangePasswordForm } from "./useChangePasswordForm";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";

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
      <Button variant="link" asChild>
        <Link href="/forgot-password">Forgot password?</Link>
      </Button>
    </Form>
  );
}
