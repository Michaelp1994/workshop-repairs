import type { PartID } from "@repo/validators/ids.validators";

import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { defaultPart, partFormSchema } from "~/schemas/parts.schema";
import { api } from "~/trpc/react";

export default function useUpdatePartForm(partId: PartID) {
  const router = useRouter();
  const query = api.parts.getById.useQuery({ id: partId });

  const updateMutation = api.parts.update.useMutation({
    async onSuccess(values) {
      form.disable();
      await query.refetch();
      toast.success(`Part ${values.name} updated`);
    },
    onError() {
      toast.error("Failed to delete part");
    },
  });

  const form = useForm({
    values: query.data ?? defaultPart,
    schema: partFormSchema,
    enabled: false,
    onValid: async (values) => {
      await updateMutation.mutateAsync({ ...values, id: partId });
    },
  });

  const deleteMutation = api.parts.archive.useMutation({
    async onSuccess(values) {
      toast.success(`Part ${values.name} delete`);
      router.push("/parts");
    },
    onError() {
      toast.error("Failed to create part");
    },
  });

  function deletePart() {
    deleteMutation.mutate({ id: partId });
  }

  return {
    form,
    deletePart,
    ...query,
  };
}
