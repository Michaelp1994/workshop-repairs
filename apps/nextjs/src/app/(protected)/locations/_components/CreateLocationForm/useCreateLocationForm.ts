import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";

import {
  defaultLocation,
  locationFormSchema,
} from "~/schemas/locations.schema";
import { api } from "~/trpc/react";

export function useCreateLocationForm() {
  const createMutation = api.locations.create.useMutation({
    onSuccess(data) {
      toast.success(`Location ${data.name} created`);
    },
    onError(error) {
      toast.error("Failed to create location");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultLocation,
    schema: locationFormSchema,
    onValid: (data) => {
      createMutation.mutate(data);
    },
  });

  return form;
}
