"use client";
import type { RepairCommentID } from "@repo/validators/ids.validators";

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
import { toast } from "@repo/ui/sonner";
import { Textarea } from "@repo/ui/textarea";
import {
  type RepairCommentFormInput,
  repairCommentFormSchema,
} from "@repo/validators/client/repairComments.schema";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateRepairCommentFormProps {
  repairCommentId: RepairCommentID;
}

export default function UpdateRepairCommentForm({
  repairCommentId,
}: UpdateRepairCommentFormProps) {
  const utils = api.useUtils();
  const router = useRouter();
  const [data] = api.repairComments.getById.useSuspenseQuery({
    id: repairCommentId,
  });

  const updateMutation = api.repairComments.update.useMutation({
    async onSuccess(data) {
      toast.success(`Repair Comment updated`);
      await utils.repairComments.getAllByRepairId.invalidate({
        repairId: data.repairId,
      });
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: data,
    schema: repairCommentFormSchema,
  });

  function handleValid(data: RepairCommentFormInput) {
    updateMutation.mutate({ ...data, id: repairCommentId });
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormFooter>
          <ResetButton />
          <SubmitButton isLoading={updateMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
