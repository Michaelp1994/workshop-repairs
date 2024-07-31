import type { RepairCommentID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
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
import { Input } from "@repo/ui/input";

import useUpdateRepairCommentForm from "./useUpdateRepairCommentForm";

interface UpdateRepairCommentFormProps {
  repairCommentId: RepairCommentID;
}

export default function UpdateRepairCommentForm({
  repairCommentId,
}: UpdateRepairCommentFormProps) {
  const form = useUpdateRepairCommentForm(repairCommentId);

  if (form.query.isLoading) {
    return <div>Loading...</div>;
  }

  if (form.query.isError) {
    return <div>Error</div>;
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="comment"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
    </Form>
  );
}
