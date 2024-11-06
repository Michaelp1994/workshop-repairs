import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import {
  defaultRepairStatusType,
  repairStatusTypeFormSchema,
} from "@repo/validators/forms/repairStatusTypes.schema";
import type { RepairStatusTypeID } from "@repo/validators/ids.validators";
import { api } from "~/trpc/client";

export default function useUpdateRepairStatusTypeForm(
  repairStatusTypeId: RepairStatusTypeID,
) {
  const query = api.repairStatusTypes.getById.useQuery({
    id: repairStatusTypeId,
  });

  const updateMutation = api.repairStatusTypes.update.useMutation({
    onSuccess(values) {
      toast.success(`RepairStatusType ${values.name} created`);
    },
    onError(error) {
      toast.error("Failed to create repairStatusType");
      console.log(error);
    },
  });

  const form = useForm({
    values: query.data ?? defaultRepairStatusType,
    schema: repairStatusTypeFormSchema,
    onValid: async (values) => {
      await updateMutation.mutateAsync({
        ...values,
        id: repairStatusTypeId,
      });
    },
  });

  return {
    ...form,
    query,
  };
}
