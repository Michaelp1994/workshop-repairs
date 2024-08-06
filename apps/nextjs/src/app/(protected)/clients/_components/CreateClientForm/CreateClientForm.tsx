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
import { useRouter } from "next/navigation";

import {
  type ClientFormInput,
  clientFormSchema,
  defaultClient,
} from "@repo/validators/forms/clients.schema";
import { api } from "~/trpc/react";

export default function CreateClientForm() {
  const router = useRouter();
  const createMutation = api.clients.create.useMutation({
    onSuccess(data) {
      toast.success(`Client created`);
      router.push(`/clients/${data.id}`);
    },
    onError(error) {
      toast.error("Failed to create client");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultClient,
    schema: clientFormSchema,
  });

  function handleValid(values: ClientFormInput) {
    createMutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
