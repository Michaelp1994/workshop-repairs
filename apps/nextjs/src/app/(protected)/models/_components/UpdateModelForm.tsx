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
  type ModelFormInput,
  modelFormSchema,
} from "@repo/validators/forms/models.schema";

import EquipmentTypeSelect from "~/components/selects/EquipmentTypeSelect";
import ManufacturerSelect from "~/components/selects/ManufacturerSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateModelFormProps {
  modelId: ModelID;
}

export default function UpdateModelForm({ modelId }: UpdateModelFormProps) {
  const utils = api.useUtils();
  const [model] = api.models.getById.useSuspenseQuery({
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
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: model,
    schema: modelFormSchema,
  });

  function handleValid(values: ModelFormInput) {
    updateMutation.mutate({ ...values, id: modelId });
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

        <FormFooter>
          <ResetButton />
          <SubmitButton isLoading={updateMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
