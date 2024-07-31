import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import {
  defaultRepairImage,
  repairImageFormSchema,
} from "~/schemas/repairImages.schema";
import type { RepairImageID } from "@repo/validators/ids.validators";
import { api } from "~/trpc/react";

export default function useUpdateRepairImageForm(repairImageId: RepairImageID) {
  const query = api.repairImages.getById.useQuery({ id: repairImageId });

  const updateMutation = api.repairImages.update.useMutation({
    onSuccess() {
      toast.success(`Repair Image updated`);
    },
    onError(error) {
      toast.error("Failed to update repairImage");
      console.log(error);
    },
  });

  const form = useForm({
    values: query.data ?? defaultRepairImage,
    schema: repairImageFormSchema,
    onValid: async (values) => {
      await updateMutation.mutateAsync({ ...values, id: repairImageId });
    },
  });

  return {
    ...form,
    query,
  };
}
