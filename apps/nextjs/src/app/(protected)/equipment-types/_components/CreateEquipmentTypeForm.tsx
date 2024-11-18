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
  defaultEquipmentType,
  type EquipmentTypeFormInput,
  equipmentTypeFormSchema,
} from "@repo/validators/forms/equipmentTypes.schema";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function CreateEquipmentTypeForm() {
  const router = useRouter();
  const createMutation = api.equipmentTypes.create.useMutation({
    onSuccess(data) {
      toast.success(`${data.name} created`);
      router.push(`/equipment-types/${data.id}`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    defaultValues: defaultEquipmentType,
    schema: equipmentTypeFormSchema,
  });

  async function handleValid(values: EquipmentTypeFormInput) {
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
        <FormFooter>
          <ResetButton />
          <SubmitButton isLoading={createMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
