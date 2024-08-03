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
import { Input } from "@repo/ui/input";

import { useUpdateClientForm } from "./useUpdateClientForm";

interface BaseFormProps {
  clientId: ClientID;
}

export default function UpdateClientForm({ clientId }: BaseFormProps) {
  const {
    isLoading,
    data: client,
    isError,
    form,
  } = useUpdateClientForm(clientId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !client) {
    return <div>Error</div>;
  }

  return (
    <Form {...form}>
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
    </Form>
  );
}
