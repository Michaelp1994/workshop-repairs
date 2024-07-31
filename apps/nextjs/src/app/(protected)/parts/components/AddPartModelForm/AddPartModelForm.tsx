import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import type { PartID } from "@repo/validators/ids.validators";
import { useAddPartModelForm } from "./useAddPartModelForm";
import ModelSelect from "~/app/_components/ModelSelect";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

interface AddPartModelFormProps {
  partId: PartID;
}

export default function AddPartModelForm({ partId }: AddPartModelFormProps) {
  const form = useAddPartModelForm(partId);

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="modelId"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <ModelSelect {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          );
        }}
      />
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

      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
