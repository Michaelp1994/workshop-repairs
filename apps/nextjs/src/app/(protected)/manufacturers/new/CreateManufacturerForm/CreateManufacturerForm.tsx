"use client";

import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";

import { useCreateManufacturerForm } from "./useCreateManufacturerForm";

export default function CreateManufacturerForm() {
  const form = useCreateManufacturerForm();

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
      <div>
        <Button type="reset">Reset</Button>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}
