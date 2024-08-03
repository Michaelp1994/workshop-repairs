import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";

import { defaultModel, modelFormSchema } from "~/schemas/models.schema";
import { api } from "~/trpc/react";

export function useCreateModelForm() {
  const createMutation = api.models.create.useMutation({
    onSuccess(data) {
      toast.success(`Model ${data.name} created`);
    },
    onError(error) {
      toast.error("Failed to create model");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultModel,
    schema: modelFormSchema,
    onValid: (data) => {
      createMutation.mutate(data);
    },
  });

  return form;
}
