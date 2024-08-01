import type { ClientID } from "@repo/validators/ids.validators";

import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { clientFormSchema, defaultClient } from "~/schemas/clients.schema";
import { api } from "~/trpc/react";

export function useUpdateClientForm(id: ClientID) {
  const router = useRouter();
  const query = api.clients.getById.useQuery({ id });
  const deleteMutation = api.clients.archive.useMutation({
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
