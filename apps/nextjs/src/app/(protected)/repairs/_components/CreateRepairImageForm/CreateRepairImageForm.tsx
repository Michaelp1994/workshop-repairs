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
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";

import { useCreateRepairImageForm } from "./useCreateRepairImageForm";

interface CreateRepairImageFormProps {
  repairId: RepairID;
  onFinish: () => void;
}

export default function CreateRepairImageForm({
  repairId,
  onFinish,
}: CreateRepairImageFormProps) {
  const form = useCreateRepairImageForm(repairId, onFinish);

  return (
    <Form {...form}>
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
    </Form>
  );
}
