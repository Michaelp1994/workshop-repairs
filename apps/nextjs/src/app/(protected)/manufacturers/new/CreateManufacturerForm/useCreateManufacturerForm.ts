import {
  manufacturerFormSchema,
  defaultManufacturer,
} from "~/schemas/manufacturers.schema";
import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

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
