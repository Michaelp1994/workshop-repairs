import type { RepairID } from "@repo/validators/ids.validators";

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
  useForm,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import {
  defaultRepairImage,
  type RepairImageFormInput,
  repairImageFormSchema,
} from "~/schemas";
import { api } from "~/trpc/react";

interface CreateRepairImageFormProps {
  repairId: RepairID;
}

export default function CreateRepairImageForm({
  repairId,
}: CreateRepairImageFormProps) {
  const utils = api.useUtils();
  const router = useRouter();
  const createMutation = api.repairImages.create.useMutation({
    async onSuccess() {
      await utils.repairImages.getAllByRepairId.invalidate({
        repairId,
      });
      toast.success(`Repair Image uploaded`);
      router.push(`/repairs/${repairId}`);
    },
    onError(error) {
      toast.error("Failed to create repairImage");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultRepairImage,
    schema: repairImageFormSchema,
  });

  async function handleValid(values: RepairImageFormInput) {
    await createMutation.mutateAsync({ ...values, repairId });
  }
  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
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
