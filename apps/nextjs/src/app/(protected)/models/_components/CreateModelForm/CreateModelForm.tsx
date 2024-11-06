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
import {
  defaultModel,
  type ModelFormInput,
  modelFormSchema,
} from "@repo/validators/forms/models.schema";
import { useRouter } from "next/navigation";

import EquipmentTypeSelect from "~/components/selects/EquipmentTypeSelect";
import ManufacturerSelect from "~/components/selects/ManufacturerSelect";
import { api } from "~/trpc/client";

export default function CreateModelForm() {
  const router = useRouter();
  const createMutation = api.models.create.useMutation({
    onSuccess(data) {
      toast.success(`Model ${data.name} created`);
      router.push(`/models/${data.id}`);
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
