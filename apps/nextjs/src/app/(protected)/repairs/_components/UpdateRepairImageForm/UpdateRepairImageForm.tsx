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
import { Input } from "@repo/ui/input";

import useUpdateRepairImageForm from "./useUpdateRepairImageForm";

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
      <FormFooter>
        <ResetButton />
        <SubmitButton />
      </FormFooter>
    </Form>
  );
}
