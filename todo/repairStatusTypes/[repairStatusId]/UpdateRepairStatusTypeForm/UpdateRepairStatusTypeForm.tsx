import type { RepairStatusTypeID } from "@repo/validators/ids.validators";
import useUpdateRepairStatusTypeForm from "./useUpdateRepairStatusTypeForm";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";

interface UpdateRepairStatusTypeFormProps {
  repairStatusTypeId: RepairStatusTypeID;
}

export default function UpdateRepairStatusTypeForm({
  repairStatusTypeId,
}: UpdateRepairStatusTypeFormProps) {
  const form = useUpdateRepairStatusTypeForm(repairStatusTypeId);

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
        name="name"
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
