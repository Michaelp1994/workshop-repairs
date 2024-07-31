import {
  repairImageFormSchema,
  defaultRepairImage,
} from "~/schemas/repairImages.schema";
import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import type { RepairID } from "@repo/validators/ids.validators";
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
