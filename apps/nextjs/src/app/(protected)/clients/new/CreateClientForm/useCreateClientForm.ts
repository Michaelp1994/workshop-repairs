import { clientFormSchema, defaultClient } from "~/schemas/clients.schema";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useForm } from "@repo/ui/form";

export function useCreateClientForm() {
  const router = useRouter();
  const createMutation = api.clients.create.useMutation({
    onSuccess(data) {
      toast.success(`Client created`);
      router.push(`/clients/${data.id}`);
    },
    onError(error) {
      toast.error("Failed to create client");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultClient,
    schema: clientFormSchema,
    onValid: (data) => {
      createMutation.mutate(data);
    },
  });

  return form;
}
