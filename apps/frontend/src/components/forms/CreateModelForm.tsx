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
  defaultModel,
  type ModelFormInput,
  modelFormSchema,
} from "~/validators/models.schema";
import { useNavigate, useSearch } from "@tanstack/react-router";

import EquipmentTypeSelect from "~/components/selects/EquipmentTypeSelect";
import ManufacturerSelect from "~/components/selects/ManufacturerSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function CreateModelForm() {
  const navigate = useNavigate();
  const { manufacturerId, equipmentTypeId } = useSearch({
    strict: false,
  });

  const createMutation = api.models.create.useMutation({
    async onSuccess(data) {
      toast.success(`Model ${data.name} created`);
      await navigate({
        to: "/models/$modelId",
        params: { modelId: data.id },
      });
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    defaultValues: {
      ...defaultModel,
      manufacturerId: manufacturerId ?? defaultModel.manufacturerId,
      equipmentTypeId: equipmentTypeId ?? defaultModel.equipmentTypeId,
    },
    schema: modelFormSchema,
  });

  function handleValid(values: ModelFormInput) {
    createMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
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
          name="nickname"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
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
