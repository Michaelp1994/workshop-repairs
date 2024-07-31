import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import {
  defaultManufacturer,
  manufacturerFormSchema,
} from "~/schemas/manufacturers.schema";
import { api } from "~/trpc/react";

export function useCreateManufacturerForm() {
  const router = useRouter();
  const createMutation = api.manufacturers.create.useMutation({
    async onSuccess(data) {
      toast.success(`Manufacturer ${data.name} created`);
      router.push(`/manufacturers/${data.id}`);
    },
    onError(error) {
      toast.error("Failed to create manufacturer");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultManufacturer,
    schema: manufacturerFormSchema,
    onValid: (data) => {
      createMutation.mutate(data);
    },
  });

  return form;
}
