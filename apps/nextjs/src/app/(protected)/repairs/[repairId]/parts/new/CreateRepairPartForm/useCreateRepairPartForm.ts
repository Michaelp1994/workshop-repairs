import type { RepairID } from "@repo/validators/ids.validators";

import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";

import {
  defaultRepairPart,
  repairPartFormSchema,
} from "~/schemas/repairParts.schema";
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
