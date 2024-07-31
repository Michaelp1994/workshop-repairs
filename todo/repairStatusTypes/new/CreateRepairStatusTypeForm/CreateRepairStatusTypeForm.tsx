import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  SubmitButton,
  ResetButton,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { useCreateRepairStatusTypeForm } from "./useCreateRepairStatusTypeForm";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

export default function CreateRepairStatusTypeForm() {
  const form = useCreateRepairStatusTypeForm();

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
      <FormField
        control={form.control}
        name="colour"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Colour</FormLabel>
              <FormControl>
                <Input type="color" {...field} />
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
