import { repairFormSchema, defaultRepair } from "~/schemas/repair.schema";
import { toast } from "@repo/ui/sonner";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useForm } from "@repo/ui/form";
export function useCreateRepairForm() {
  const router = useRouter();
  const createMutation = api.repairs.create.useMutation({
    async onSuccess(values) {
      toast.success(`Repair created`);
      router.push(`/repairs/${values.id}`);
    },
    onError(error) {
      toast.error("Failed to create repair");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: {
      ...defaultRepair,
      // assetId: params.assetId ?? defaultRepair.assetId,
    },
    schema: repairFormSchema,
  });

  return { form, createMutation };
}
