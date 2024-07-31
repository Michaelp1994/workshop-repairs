import {
  partsToModelsFormSchema,
  defaultPartsToModels,
} from "~/schemas/partsToModels.schema";
import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import type { PartID } from "@repo/validators/ids.validators";
import { api } from "~/trpc/react";

export function useAddPartModelForm(partId: PartID) {
  const createMutation = api.partsToModels.create.useMutation({
    onSuccess() {
      toast.success(`Part To Model relationship created`);
    },
    onError(error) {
      toast.error("Failed to create parts to model relationship");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultPartsToModels,
    schema: partsToModelsFormSchema,
    onValid: (data) => {
      createMutation.mutate({ ...data, partId });
    },
  });

  return form;
}
