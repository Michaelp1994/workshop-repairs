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

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateRepairImageFormProps {
  repairImageId: RepairImageID;
}

export default function UpdateRepairImageForm({
  repairImageId,
}: UpdateRepairImageFormProps) {
  const [repairImage] = api.repairImages.getById.useSuspenseQuery({
    id: repairImageId,
  });

  const updateMutation = api.repairImages.update.useMutation({
    onSuccess() {
      toast.success(`Repair Image updated`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: repairImage,
    schema: repairImageFormSchema,
  });

  function handleValid(values: RepairImageFormInput) {
    updateMutation.mutate({ ...values, id: repairImageId });
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
