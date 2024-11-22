"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  SubmitButton,
  useForm,
} from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";
import { Textarea } from "@repo/ui/textarea";
import {
  defaultRepairComment,
  type RepairCommentFormInput,
  repairCommentFormSchema,
} from "@repo/validators/client/repairComments.schema";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";
import generateRepairSlug from "~/utils/generateRepairSlug";

interface CreateRepairCommentFormProps {
  repairId: RepairID;
}

export default function CreateRepairCommentForm({
  repairId,
}: CreateRepairCommentFormProps) {
  const utils = api.useUtils();
  const createMutation = api.repairComments.create.useMutation({
    async onSuccess(data) {
      await utils.repairComments.getAllByRepairId.invalidate({
        repairId,
      });
      form.reset();
      toast.success(`Comment added to ${generateRepairSlug(data.repairId)}`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    defaultValues: defaultRepairComment,
    schema: repairCommentFormSchema,
  });

  function handleValid(data: RepairCommentFormInput) {
    createMutation.mutate({ ...data, repairId });
  }

  return (
    <Form {...form}>
      <form
        onReset={() => {
          form.reset();
        }}
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Add a comment</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea placeholder="Write your comment..." {...field} />
                  </FormControl>
                  <SubmitButton
                    className="absolute bottom-2 right-2"
                    disabled={!form.formState.isDirty}
                    isLoading={createMutation.isPending}
                  />
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
}
