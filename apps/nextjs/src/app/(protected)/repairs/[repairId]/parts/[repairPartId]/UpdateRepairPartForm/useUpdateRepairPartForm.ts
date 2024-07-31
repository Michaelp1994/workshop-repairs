import type { RepairPartID } from "@repo/validators/ids.validators";

import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";

import {
  defaultRepairPart,
  repairPartFormSchema,
} from "~/schemas/repairParts.schema";
import { api } from "~/trpc/react";

export default function useUpdateRepairPartForm(
  repairPartId: RepairPartID,
  onFinish: () => void,
) {
  const query = api.repairParts.getById.useQuery({ id: repairPartId });
  const utils = api.useUtils();
  const updateMutation = api.repairParts.update.useMutation({
    async onSuccess(data) {
      await utils.repairParts.getAllByRepairId.invalidate({
        id: data.repairId,
      });
      toast.success(`Repair Part updated`);
      onFinish();
    },
    onError(error) {
      toast.error("Failed to create repairPart");
      console.log(error);
    },
  });

  const form = useForm({
    values: query.data ?? defaultRepairPart,
    schema: repairPartFormSchema,
    onValid: async (values) => {
      await updateMutation.mutateAsync({ ...values, id: repairPartId });
    },
  });

  return {
    form,
    ...query,
  };
}
