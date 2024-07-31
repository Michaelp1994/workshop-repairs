import { clientFormSchema, defaultClient } from "~/schemas/clients.schema";
import { toast } from "@repo/ui/sonner";
import type { ClientID } from "@repo/validators/ids.validators";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useForm } from "@repo/ui/form";

export function useUpdateClientForm(id: ClientID) {
  const router = useRouter();
  const query = api.clients.getById.useQuery({ id });
  const deleteMutation = api.clients.delete.useMutation({
    async onSuccess() {
      toast.success(`Client deleted`);
      form.disable();
      router.push("/clients");
    },
    onError(error) {
      toast.error("Failed to delete client");
      console.log(error);
    },
  });
  const updateMutation = api.clients.update.useMutation({
    onSuccess() {
      toast.success(`Client updated`);
      form.disable();
    },
    onError(error) {
      toast.error("Failed to create client");
      console.log(error);
    },
  });

  function deleteClient() {
    deleteMutation.mutate({ id });
  }

  const form = useForm({
    values: query.data ?? defaultClient,
    schema: clientFormSchema,
    enabled: false,

    onValid: async (values) => {
      await updateMutation.mutateAsync({ ...values, id });
    },
  });

  return {
    form,
    deleteClient,
    ...query,
  };
}
