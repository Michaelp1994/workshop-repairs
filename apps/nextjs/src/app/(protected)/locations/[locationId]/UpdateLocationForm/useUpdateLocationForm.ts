import type { LocationID } from "@repo/validators/ids.validators";

import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import {
  defaultLocation,
  locationFormSchema,
} from "~/schemas/locations.schema";
import { api } from "~/trpc/react";

export default function useUpdateLocationForm(locationId: LocationID) {
  const router = useRouter();
  const query = api.locations.getById.useQuery({ id: locationId });
  const deleteMutation = api.locations.archive.useMutation({
    async onSuccess() {
      toast.success(`Location deleted`);
      router.push("/locations");
    },
    onError() {
      toast.error("Failed to delete location");
    },
  });
  const updateMutation = api.locations.update.useMutation({
    async onSuccess(values) {
      toast.success(`Location ${values.name} created`);
      await query.refetch();
      form.disable();
    },
    onError() {
      toast.error("Failed to update location");
    },
  });

  function deleteLocation() {
    deleteMutation.mutate({ id: locationId });
  }

  const form = useForm({
    values: query.data ?? defaultLocation,
    schema: locationFormSchema,
    enabled: false,
    onValid: async (values) => {
      await updateMutation.mutateAsync({ ...values, id: locationId });
    },
  });

  return {
    form,
    deleteLocation,
    ...query,
  };
}
