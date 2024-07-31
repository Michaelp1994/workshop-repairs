import { partFormSchema, defaultPart } from "~/schemas/parts.schema";
import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import { api } from "~/trpc/react";

export function useCreatePartForm() {
  const createMutation = api.parts.create.useMutation({
    onSuccess(data) {
      toast.success(`Part ${data.name} created`);
    },
    onError(error) {
      toast.error("Failed to create part");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultPart,
    schema: partFormSchema,
    onValid: (data) => {
      createMutation.mutate(data);
    },
  });

  return form;
}
