"use client";
import type { ModelID } from "@repo/validators/ids.validators";

import { type RouterOutputs } from "@repo/api/root";
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

import ManufacturerSelect from "~/components/ManufacturerSelect";
import { type ModelFormInput, modelFormSchema } from "~/schemas";
import { api } from "~/trpc/react";

interface UpdateModelFormProps {
  modelId: ModelID;
  model: RouterOutputs["models"]["getById"];
}

export default function UpdateModelForm({ model }: UpdateModelFormProps) {
  const updateMutation = api.models.update.useMutation({
    onSuccess(values) {
      toast.success(`Model ${values.name} updated`);
    },
    onError() {
      toast.error("Failed to update model");
    },
  });

  const form = useForm({
    values: model,
    schema: modelFormSchema,
  });

  async function handleValid(values: ModelFormInput) {
    await updateMutation.mutateAsync({ ...values, id: model.id });
  }

  return (
    <Form {...form}>
      <form
        onReset={() => {
          form.reset();
        }}
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
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

        {form.formState.isDirty && (
          <FormFooter>
            <ResetButton />
            <SubmitButton />
          </FormFooter>
        )}
      </form>
    </Form>
  );
}
