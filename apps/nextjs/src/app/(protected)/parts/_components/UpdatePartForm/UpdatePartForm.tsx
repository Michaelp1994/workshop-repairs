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
import { api } from "~/trpc/react";

interface UpdatePartFormProps {
  partId: PartID;
}

export default function UpdatePartForm({ partId }: UpdatePartFormProps) {
  const { isError, isLoading, data } = api.parts.getById.useQuery({
    id: partId,
  });

  const updateMutation = api.parts.update.useMutation({
    onSuccess(values) {
      toast.success(`Part ${values.name} updated`);
    },
    onError() {
      toast.error("Failed to delete part");
    },
  });

  const form = useForm({
    values: data,
    schema: partFormSchema,
  });

  async function handleValid(values: PartFormInput) {
    await updateMutation.mutateAsync({ ...values, id: partId });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
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
