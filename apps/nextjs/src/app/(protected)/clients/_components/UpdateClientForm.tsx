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
} from "@repo/validators/client/clients.schema";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface BaseFormProps {
  clientId: ClientID;
}

export default function UpdateClientForm({ clientId }: BaseFormProps) {
  const [client] = api.clients.getById.useSuspenseQuery({
    id: clientId,
  });
  const updateMutation = api.clients.update.useMutation({
    onSuccess() {
      toast.success(`Client updated`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: client,
    schema: clientFormSchema,
  });

  function handleValid(values: ClientFormInput) {
    updateMutation.mutate({ ...values, id: clientId });
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
