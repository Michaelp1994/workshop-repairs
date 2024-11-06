import {
  repairStatusTypeFormSchema,
  defaultRepairStatusType,
} from "@repo/validators/forms/repairStatusTypes.schema";
import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import { api } from "~/trpc/client";

export function useCreateRepairStatusTypeForm() {
  const createMutation = api.repairStatusTypes.create.useMutation({
    onSuccess(data) {
      toast.success(`RepairStatusType ${data.name} created`);
    },
    onError(error) {
      toast.error("Failed to create repairStatusType");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultRepairStatusType,
    schema: repairStatusTypeFormSchema,
    onValid: (data) => {
      createMutation.mutate(data);
    },
  });

  return form;
}
