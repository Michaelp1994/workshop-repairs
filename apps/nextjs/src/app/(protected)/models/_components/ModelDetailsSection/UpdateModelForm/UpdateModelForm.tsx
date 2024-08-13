"use client";
import type { ModelID } from "@repo/validators/ids.validators";

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
import {
  defaultModel,
  type ModelFormInput,
  modelFormSchema,
} from "@repo/validators/forms/models.schema";

import EquipmentTypeSelect from "~/components/selects/EquipmentTypeSelect";
import ManufacturerSelect from "~/components/selects/ManufacturerSelect";
import { api } from "~/trpc/react";

interface UpdateModelFormProps {
  modelId: ModelID;
}

export default function UpdateModelForm({ modelId }: UpdateModelFormProps) {
  const utils = api.useUtils();
  const { data, isLoading, isError } = api.models.getById.useQuery({
    id: modelId,
  });

  const updateMutation = api.models.update.useMutation({
    async onMutate() {
      await utils.models.getAll.cancel();
      await utils.models.getById.cancel({ id: modelId });
    },
    async onSuccess(values) {
      toast.success(`Model ${values.name} updated`);
      await utils.models.getById.invalidate({ id: modelId });
      await utils.models.getAll.invalidate();
    },
    onError() {
      toast.error("Failed to update model");
    },
  });

  const form = useForm({
    values: data,
    defaultValues: defaultModel,
    schema: modelFormSchema,
  });

  async function handleValid(values: ModelFormInput) {
    await updateMutation.mutateAsync({ ...values, id: modelId });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
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
        <FormField
          control={form.control}
          name="equipmentTypeId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Equipment Type</FormLabel>
                <FormControl>
                  <EquipmentTypeSelect {...field} />
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
