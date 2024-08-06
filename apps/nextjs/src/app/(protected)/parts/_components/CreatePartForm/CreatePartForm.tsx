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
  useForm,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";

import { defaultPart, type PartFormInput, partFormSchema } from "~/schemas";
import { api } from "~/trpc/react";

export default function CreatePartForm() {
  const createMutation = api.parts.create.useMutation({
    onSuccess(data) {
      toast.success(`Part ${data.name} created`);
    },
    onError(error) {
      toast.error("Failed to create part");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultPart,
    schema: partFormSchema,
  });

  async function handleValid(values: PartFormInput) {
    await createMutation.mutateAsync(values);
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
