import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import type { RepairImageID } from "@repo/validators/ids.validators";
import useUpdateRepairImageForm from "./useUpdateRepairImageForm";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

interface UpdateRepairImageFormProps {
  repairImageId: RepairImageID;
}

export default function UpdateRepairImageForm({
  repairImageId,
}: UpdateRepairImageFormProps) {
  const form = useUpdateRepairImageForm(repairImageId);

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
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
