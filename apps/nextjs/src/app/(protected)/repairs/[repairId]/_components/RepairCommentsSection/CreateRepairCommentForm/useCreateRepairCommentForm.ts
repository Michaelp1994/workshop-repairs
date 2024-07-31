import {
  repairCommentFormSchema,
  defaultRepairComment,
} from "~/schemas/repairComments.schema";
import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import type { RepairID } from "@repo/validators/ids.validators";
import { api } from "~/trpc/react";

export function useCreateRepairCommentForm(repairId: RepairID) {
  const utils = api.useUtils();
  const createMutation = api.repairComments.create.useMutation({
    async onSuccess() {
      toast.success(`Comment added`);
      form.reset();
      await utils.repairComments.getAllByRepairId.invalidate({
        repairId,
      });
    },
    onError(error) {
      toast.error("Failed to create repairComment");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultRepairComment,
    schema: repairCommentFormSchema,
  });

  return { form, createMutation };
}
