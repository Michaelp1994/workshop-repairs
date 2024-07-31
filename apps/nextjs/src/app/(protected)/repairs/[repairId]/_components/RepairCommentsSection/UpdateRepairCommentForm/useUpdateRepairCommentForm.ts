import type { RepairCommentID } from "@repo/validators/ids.validators";

import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";

import {
  defaultRepairComment,
  repairCommentFormSchema,
} from "~/schemas/repairComments.schema";
import { api } from "~/trpc/react";

export default function useUpdateRepairCommentForm(
  repairCommentId: RepairCommentID,
) {
  const query = api.repairComments.getById.useQuery({ id: repairCommentId });

  const updateMutation = api.repairComments.update.useMutation({
    onSuccess() {
      toast.success(`Repair Comment created`);
    },
    onError(error) {
      toast.error("Failed to create repairComment");
      console.log(error);
    },
  });

  const form = useForm({
    values: query.data ?? defaultRepairComment,
    schema: repairCommentFormSchema,
    onValid: async (values) => {
      await updateMutation.mutateAsync({
        ...values,
        id: repairCommentId,
      });
    },
  });

  return {
    ...form,
    query,
  };
}
