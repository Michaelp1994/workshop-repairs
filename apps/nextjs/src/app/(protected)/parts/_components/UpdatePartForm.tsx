"use client";
import type { PartID } from "@repo/validators/ids.validators";

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
  type PartFormInput,
  partFormSchema,
} from "@repo/validators/forms/parts.schema";

import { api } from "~/trpc/client";

interface UpdatePartFormProps {
  partId: PartID;
}

export default function UpdatePartForm({ partId }: UpdatePartFormProps) {
  const [part] = api.parts.getById.useSuspenseQuery({
    id: partId,
  });

  const updateMutation = api.parts.update.useMutation({
    onSuccess(values) {
      toast.success(`Part ${values.name} updated`);
    },
    onError() {
      toast.error("Failed to update part");
    },
  });

  const form = useForm({
    values: part,
    schema: partFormSchema,
  });

  function handleValid(values: PartFormInput) {
    updateMutation.mutate({ ...values, id: partId });
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
        <FormField
          control={form.control}
          name="partNumber"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Part Number</FormLabel>
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
