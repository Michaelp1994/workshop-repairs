import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import type { RepairCommentID } from "@repo/validators/ids.validators";
import useUpdateRepairCommentForm from "./useUpdateRepairCommentForm";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

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
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
