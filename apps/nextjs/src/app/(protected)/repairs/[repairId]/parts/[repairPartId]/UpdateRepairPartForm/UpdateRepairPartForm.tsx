import type { RepairPartID } from "@repo/validators/ids.validators";

import { Checkbox } from "@repo/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  ResetButton,
  SubmitButton,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";

import PartSelect from "~/app/_components/PartSelect";

import useUpdateRepairPartForm from "./useUpdateRepairPartForm";

interface UpdateRepairPartFormProps {
  repairPartId: RepairPartID;
  onFinish: () => void;
}

export default function UpdateRepairPartForm({
  repairPartId,
  onFinish,
}: UpdateRepairPartFormProps) {
  const { isLoading, isError, error, data, form } = useUpdateRepairPartForm(
    repairPartId,
    onFinish,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    console.log(error);
    return <div>Error</div>;
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="quantity"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="installed"
        render={({ field }) => {
          return (
            <FormItem>
              <div>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div>
                  <FormLabel>Installed</FormLabel>
                  <FormDescription>
                    Select this checkbox if the part has already been installed
                  </FormDescription>
                </div>
                <FormMessage />
              </div>
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="partId"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Part</FormLabel>
              <FormControl>
                <PartSelect repairId={data.repairId} {...field} />
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
