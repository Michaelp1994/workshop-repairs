import {
  repairTypeFormSchema,
  defaultRepairType,
} from "@repo/validators/forms/repairTypes.schema";
import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import { api } from "~/trpc/react";

export function useCreateRepairTypeForm() {
  const createMutation = api.repairTypes.create.useMutation({
    onSuccess(data) {
      toast.success(`RepairType ${data.name} created`);
    },
    onError(error) {
      toast.error("Failed to create repairType");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultRepairType,
    schema: repairTypeFormSchema,
    onValid: (data) => {
      createMutation.mutate(data);
    },
  });

  return form;
}
