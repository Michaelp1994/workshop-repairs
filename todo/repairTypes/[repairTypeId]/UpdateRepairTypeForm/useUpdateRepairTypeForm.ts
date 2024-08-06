import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import {
  defaultRepairType,
  repairTypeFormSchema,
} from "@repo/validators/forms/repairTypes.schema";
import type { RepairTypeID } from "@repo/validators/ids.validators";
import { api } from "~/trpc/react";

export default function useUpdateRepairTypeForm(repairTypeId: RepairTypeID) {
  const query = api.repairTypes.getById.useQuery({ id: repairTypeId });

  const updateMutation = api.repairTypes.update.useMutation({
    onSuccess(values) {
      toast.success(`RepairType ${values.name} created`);
    },
    onError(error) {
      toast.error("Failed to create repairType");
      console.log(error);
    },
  });

  const form = useForm({
    values: query.data ?? defaultRepairType,
    schema: repairTypeFormSchema,
    onValid: async (values) => {
      await updateMutation.mutateAsync({ ...values, id: repairTypeId });
    },
  });

  return {
    ...form,
    query,
  };
}
