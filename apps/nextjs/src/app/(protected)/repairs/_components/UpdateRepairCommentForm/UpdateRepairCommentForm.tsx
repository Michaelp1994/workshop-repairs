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
} from "@repo/validators/forms/repairComments.schema";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

interface UpdateRepairCommentFormProps {
  repairCommentId: RepairCommentID;
}

export default function UpdateRepairCommentForm({
  repairCommentId,
}: UpdateRepairCommentFormProps) {
  const utils = api.useUtils();
  const router = useRouter();
  const { data, isLoading, isError } = api.repairComments.getById.useQuery({
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
    onError(error) {
      toast.error("Failed to create repairComment");
      console.log(error);
    },
  });

  const form = useForm({
    values: data,
    schema: repairCommentFormSchema,
  });

  async function handleValid(data: RepairCommentFormInput) {
    await updateMutation.mutateAsync({ ...data, id: repairCommentId });
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
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
