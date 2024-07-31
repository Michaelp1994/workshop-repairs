"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import type { RepairPartID } from "@repo/validators/ids.validators";
import { useCreateRepairPartForm } from "./useCreateRepairPartForm";
import PartSelect from "~/app/_components/PartSelect";

import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";

interface CreateRepairPartFormProps {
  repairId: RepairPartID;
}

export default function CreateRepairPartForm({
  repairId,
}: CreateRepairPartFormProps) {
  const form = useCreateRepairPartForm(repairId);

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="partId"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Part</FormLabel>
              <FormControl>
                <PartSelect repairId={repairId} {...field} />
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
