import type { PartID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
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

import ModelSelect from "~/app/_components/ModelSelect";

import { useAddPartModelForm } from "./useAddPartModelForm";

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

      <FormFooter>
        <ResetButton />
        <SubmitButton />
      </FormFooter>
    </Form>
  );
}
