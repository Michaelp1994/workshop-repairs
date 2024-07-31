import type { RepairID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormMessage,
  ResetButton,
  SubmitButton,
} from "@repo/ui/form";
import { Textarea } from "@repo/ui/textarea";

import { useCreateRepairCommentForm } from "./useCreateRepairCommentForm";

interface CreateRepairCommentFormProps {
  repairId: RepairID;
}

export default function CreateRepairCommentForm({
  repairId,
}: CreateRepairCommentFormProps) {
  const { form, createMutation } = useCreateRepairCommentForm(repairId);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          async (data) =>
            await createMutation.mutateAsync({ ...data, repairId }),
        )}
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => {
            return (
              <FormItem>
                {/* <FormLabel>Comment</FormLabel> */}
                <FormControl>
                  <Textarea placeholder="Add a comment..." {...field} />
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
