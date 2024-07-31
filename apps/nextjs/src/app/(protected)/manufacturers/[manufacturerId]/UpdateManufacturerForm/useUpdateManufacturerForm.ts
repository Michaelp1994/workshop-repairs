import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import {
  defaultManufacturer,
  manufacturerFormSchema,
} from "~/schemas/manufacturers.schema";
import type { ManufacturerID } from "@repo/validators/ids.validators";
import { api } from "~/trpc/react";

export default function useUpdateManufacturerForm(
  manufacturerId: ManufacturerID,
) {
  const query = api.manufacturers.getById.useQuery({ id: manufacturerId });

  const updateMutation = api.manufacturers.update.useMutation({
    async onSuccess(values) {
      form.disable();
      toast.success(`Manufacturer ${values.name} updated`);
      await query.refetch();
    },
    onError() {
      toast.error("Failed to create manufacturer");
    },
  });

  const deleteMutation = api.manufacturers.delete.useMutation({
    onSuccess(values) {
      toast.success(`Manufacturer ${values.name} deleted`);
      form.disable();
    },
    onError() {
      toast.error("Failed to delete manufacturer");
    },
  });

  function deleteManufacturer() {
    deleteMutation.mutate({ id: manufacturerId });
  }

  const form = useForm({
    values: query.data ?? defaultManufacturer,
    schema: manufacturerFormSchema,
    enabled: false,
    onValid: async (values) => {
      await updateMutation.mutateAsync({ ...values, id: manufacturerId });
    },
  });

  return {
    form,
    deleteManufacturer,
    ...query,
  };
}
