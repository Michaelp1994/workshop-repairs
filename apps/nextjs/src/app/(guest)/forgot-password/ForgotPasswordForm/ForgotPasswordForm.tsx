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

import { useForgotPasswordForm } from "./useForgotPasswordForm";

export default function ForgotPasswordForm() {
  const { form, isPending } = useForgotPasswordForm();
  return (
    <Form {...form}>
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
      <div>
        <Button asChild variant="outline">
          <Link href="/login">Return</Link>
        </Button>
        <Button type="submit">{isPending ? "Loading..." : "Send Code"}</Button>
      </div>
    </Form>
  );
}
