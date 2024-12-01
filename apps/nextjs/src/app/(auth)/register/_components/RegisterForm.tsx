"use client";
import { Checkbox } from "@repo/ui/checkbox";
import { ErrorAlert } from "@repo/ui/error-alert";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  SubmitButton,
  useForm,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import {
  defaultRegister,
  type RegisterFormInput,
  registerFormSchema,
} from "@repo/validators/client/auth.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm({
    schema: registerFormSchema,
    defaultValues: defaultRegister,
  });
  const registerMutation = api.auth.register.useMutation({
    async onSuccess() {
      toast.success("Account successfully created!");
      router.push("/onboarding");
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });
  function handleValid(data: RegisterFormInput) {
    registerMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <fieldset
          className="flex flex-col gap-2"
          disabled={registerMutation.isPending}
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
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
          <FormField
            control={form.control}
            name="password"
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
            name="acceptToS"
            render={({ field }) => {
              return (
                <FormItem className="mt-1 flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel className="leading-1">
                      I accept AssetRx&apos;s{" "}
                      <Link
                        className="hover:text-primary underline underline-offset-4"
                        href="/terms"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        className="hover:text-primary underline underline-offset-4"
                        href="/privacy"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              );
            }}
          />
          <ErrorAlert form={form} />
          <FormFooter>
            <SubmitButton isLoading={registerMutation.isPending}>
              Sign Up
            </SubmitButton>
          </FormFooter>
        </fieldset>
      </form>
    </Form>
  );
}
