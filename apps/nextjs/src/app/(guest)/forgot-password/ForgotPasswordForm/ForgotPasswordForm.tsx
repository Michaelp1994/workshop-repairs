import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useForgotPasswordForm } from "./useForgotPasswordForm";
import Link from "next/link";

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
        <Button variant="outline" asChild>
          <Link href="/login">Return</Link>
        </Button>
        <Button type="submit">{isPending ? "Loading..." : "Send Code"}</Button>
      </div>
    </Form>
  );
}
