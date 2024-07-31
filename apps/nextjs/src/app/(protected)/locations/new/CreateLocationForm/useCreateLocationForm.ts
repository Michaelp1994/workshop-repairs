import {
  locationFormSchema,
  defaultLocation,
} from "~/schemas/locations.schema";
import { toast } from "@repo/ui/sonner";
import { api } from "~/trpc/react";
import { useForm } from "@repo/ui/form";

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
