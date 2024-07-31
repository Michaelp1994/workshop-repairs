"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { useCreateModelForm } from "./useCreateModelForm";
import ManufacturerSelect from "~/app/_components/ManufacturerSelect";

import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

export default function CreateModelForm() {
  const form = useCreateModelForm();

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
        name="manufacturerId"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Manufacturer</FormLabel>
              <FormControl>
                <ManufacturerSelect {...field} />
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
