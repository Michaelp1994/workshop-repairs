"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { useCreateRepairForm } from "./useCreateRepairForm";
import AssetSelect from "~/app/_components/AssetSelect";
import RepairTypeSelect from "~/app/_components/RepairTypeSelect";
import RepairStatusTypeSelect from "~/app/_components/RepairStatusTypeSelect";

import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

interface CreateRepairFormProps {}

export default function CreateRepairForm({}: CreateRepairFormProps) {
  const { form, createMutation } = useCreateRepairForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => createMutation.mutateAsync(data))}
        onReset={() => form.reset()}
      >
        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Repair Type</FormLabel>
                <FormControl>
                  <RepairTypeSelect {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="assetId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Asset</FormLabel>
                <FormControl>
                  <AssetSelect {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="fault"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Fault</FormLabel>
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
          name="clientReference"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Client Reference Number</FormLabel>
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
          name="statusId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Current Status</FormLabel>
                <FormControl>
                  {<RepairStatusTypeSelect {...field} />}
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex justify-end gap-4">
          <Button type="reset">Reset</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
