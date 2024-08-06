"use client";
import type { ClientID } from "@repo/validators/ids.validators";

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

import {
  type ClientFormInput,
  clientFormSchema,
} from "@repo/validators/forms/clients.schema";
import { api } from "~/trpc/react";

interface BaseFormProps {
  clientId: ClientID;
}

export default function UpdateClientForm({ clientId }: BaseFormProps) {
  const { data, isLoading, isError } = api.clients.getById.useQuery({
    id: clientId,
  });
  const updateMutation = api.clients.update.useMutation({
    onSuccess() {
      toast.success(`Client updated`);
    },
    onError(error) {
      toast.error("Failed to create client");
      console.log(error);
    },
  });

  const form = useForm({
    values: data,
    schema: clientFormSchema,
  });

  async function handleValid(values: ClientFormInput) {
    await updateMutation.mutateAsync({ ...values, id: clientId });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error</div>;
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
