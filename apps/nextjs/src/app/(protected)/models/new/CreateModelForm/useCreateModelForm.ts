import { modelFormSchema, defaultModel } from "~/schemas/models.schema";
import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
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
