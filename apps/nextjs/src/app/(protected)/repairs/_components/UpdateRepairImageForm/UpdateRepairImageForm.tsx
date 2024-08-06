import type { RepairImageID } from "@repo/validators/ids.validators";

import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  ResetButton,
  SubmitButton,
} from "@repo/ui/form";
import { useForm } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";

import {
  type RepairImageFormInput,
  repairImageFormSchema,
} from "@repo/validators/forms/repairImages.schema";
import { api } from "~/trpc/react";

interface UpdateRepairImageFormProps {
  repairImageId: RepairImageID;
}

export default function UpdateRepairImageForm({
  repairImageId,
}: UpdateRepairImageFormProps) {
  const { data, isLoading, isError } = api.repairImages.getById.useQuery({
    id: repairImageId,
  });

  const updateMutation = api.repairImages.update.useMutation({
    onSuccess() {
      toast.success(`Repair Image updated`);
    },
    onError(error) {
      toast.error("Failed to update repairImage");
      console.log(error);
    },
  });

  const form = useForm({
    values: data,
    schema: repairImageFormSchema,
  });

  async function handleValid(values: RepairImageFormInput) {
    await updateMutation.mutateAsync({ ...values, id: repairImageId });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Caption</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormFooter>
          <ResetButton />
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
