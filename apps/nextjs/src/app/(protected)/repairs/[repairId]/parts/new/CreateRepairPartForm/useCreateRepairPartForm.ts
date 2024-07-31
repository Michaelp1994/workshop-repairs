import {
  repairPartFormSchema,
  defaultRepairPart,
} from "~/schemas/repairParts.schema";
import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import type { RepairID } from "@repo/validators/ids.validators";
import { api } from "~/trpc/react";

export function useCreateRepairPartForm(repairId: RepairID) {
  const utils = api.useUtils();
  const createMutation = api.repairParts.create.useMutation({
    async onSuccess() {
      await utils.repairParts.getAllByRepairId.invalidate({
        id: repairId,
      });
      toast.success(`Part was added to Repair`);
    },
    onError(error) {
      toast.error("Failed to create repair Part");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultRepairPart,
    schema: repairPartFormSchema,
    onValid: (data) => {
      createMutation.mutate({ ...data, repairId });
    },
  });

  return form;
}
