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

import ManufacturerSelect from "~/components/selects/ManufacturerSelect";
import {
  defaultModel,
  type ModelFormInput,
  modelFormSchema,
} from "@repo/validators/forms/models.schema";
import { api } from "~/trpc/react";

export default function CreateModelForm() {
  const createMutation = api.models.create.useMutation({
    onSuccess(data) {
      toast.success(`Model ${data.name} created`);
    },
    onError(error) {
      toast.error("Failed to create model");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultModel,
    schema: modelFormSchema,
  });

  async function handleValid(values: ModelFormInput) {
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
          name="manufacturerId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Manufacturer</FormLabel>
                <FormControl>
                  <ManufacturerSelect {...field} />
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
