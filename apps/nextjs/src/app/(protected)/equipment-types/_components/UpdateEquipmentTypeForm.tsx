"use client";

import type { EquipmentTypeID } from "@repo/validators/ids.validators";

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
  type EquipmentTypeFormInput,
  equipmentTypeFormSchema,
} from "@repo/validators/forms/equipmentTypes.schema";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateEquipmentTypeFormProps {
  equipmentTypeId: EquipmentTypeID;
}

export default function UpdateEquipmentTypeForm({
  equipmentTypeId,
}: UpdateEquipmentTypeFormProps) {
  const router = useRouter();

  const [equipmentType] = api.equipmentTypes.getById.useSuspenseQuery({
    id: equipmentTypeId,
  });

  const updateMutation = api.equipmentTypes.update.useMutation({
    onSuccess(data) {
      toast.success(`${data.name} updated.`);
      router.push(`/equipment-types/${data.id}`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    schema: equipmentTypeFormSchema,
    values: equipmentType,
  });

  async function handleValid(values: EquipmentTypeFormInput) {
    await updateMutation.mutateAsync({ ...values, id: equipmentTypeId });
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
          <SubmitButton isLoading={updateMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
