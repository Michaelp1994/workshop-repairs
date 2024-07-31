"use client";
import type { RepairPartID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
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

import { useCreateRepairPartForm } from "./useCreateRepairPartForm";

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

      <FormFooter>
        <ResetButton />
        <SubmitButton />
      </FormFooter>
    </Form>
  );
}
