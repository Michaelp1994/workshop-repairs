"use client";
import type { ManufacturerID } from "@repo/validators/ids.validators";

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

import useUpdateManufacturerForm from "./useUpdateManufacturerForm";

interface UpdateManufacturerFormProps {
  manufacturerId: ManufacturerID;
}

export default function UpdateManufacturerForm({
  manufacturerId,
}: UpdateManufacturerFormProps) {
  const { isLoading, isError, deleteManufacturer, form } =
    useUpdateManufacturerForm(manufacturerId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
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
      {form.enabled && (
        <FormFooter>
          <ResetButton />
          <SubmitButton />
        </FormFooter>
      )}
    </Form>
  );
}
