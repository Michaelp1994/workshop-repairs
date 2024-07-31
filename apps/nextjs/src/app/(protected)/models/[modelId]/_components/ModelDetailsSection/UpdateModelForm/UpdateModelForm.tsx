"use client";
import type { ModelID } from "@repo/validators/ids.validators";
import ManufacturerSelect from "~/app/_components/ManufacturerSelect";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useForm,
  FormFooter,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { api } from "~/trpc/react";
import { modelFormSchema } from "~/schemas";
import { type RouterOutputs } from "@repo/api/root";

interface UpdateModelFormProps {
  modelId: ModelID;
  model: RouterOutputs["models"]["getById"];
}

export default function UpdateModelForm({ model }: UpdateModelFormProps) {
  const updateMutation = api.models.update.useMutation({
    async onSuccess(values) {
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

  const handleSubmit = form.handleSubmit((values) =>
    updateMutation.mutateAsync(values),
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} onReset={() => form.reset()}>
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
            <Button type="reset">Reset</Button>
            <Button type="submit">Submit</Button>
          </FormFooter>
        )}
      </form>
    </Form>
  );
}
