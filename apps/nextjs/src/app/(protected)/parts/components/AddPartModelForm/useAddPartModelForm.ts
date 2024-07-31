import type { PartID } from "@repo/validators/ids.validators";

import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";

import {
  defaultPartsToModels,
  partsToModelsFormSchema,
} from "~/schemas/partsToModels.schema";
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
