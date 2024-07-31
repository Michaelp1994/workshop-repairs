import type { RepairID } from "@repo/validators/ids.validators";

import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";

import {
  defaultRepairImage,
  repairImageFormSchema,
} from "~/schemas/repairImages.schema";
import { api } from "~/trpc/react";

export function useCreateRepairImageForm(
  repairId: RepairID,
  onFinish: () => void,
) {
  const utils = api.useUtils();
  const createMutation = api.repairImages.create.useMutation({
    async onSuccess() {
      await utils.repairImages.getAllByRepairId.invalidate({
        repairId,
      });
      toast.success(`Repair Image uploaded`);
      onFinish();
    },
    onError(error) {
      toast.error("Failed to create repairImage");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultRepairImage,
    schema: repairImageFormSchema,
    onValid: (data) => {
      createMutation.mutate({ ...data, repairId });
    },
  });

  return form;
}
