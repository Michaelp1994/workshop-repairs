import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import type { RepairID } from "@repo/validators/ids.validators";
import { useCreateRepairImageForm } from "./useCreateRepairImageForm";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

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
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
