import { useCreateRepairTypeForm } from "./useCreateRepairTypeForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormFooter,
  SubmitButton,
  ResetButton,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

export default function CreateRepairTypeForm() {
  const form = useCreateRepairTypeForm();

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
