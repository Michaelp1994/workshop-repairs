"use client";
import type { PartID } from "@repo/validators/ids.validators";

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

import useUpdatePartForm from "./useUpdatePartForm";

interface UpdatePartFormProps {
  partId: PartID;
}

export default function UpdatePartForm({ partId }: UpdatePartFormProps) {
  const { isLoading, isError, deletePart, form } = useUpdatePartForm(partId);

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
      <FormField
        control={form.control}
        name="partNumber"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Part Number</FormLabel>
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
