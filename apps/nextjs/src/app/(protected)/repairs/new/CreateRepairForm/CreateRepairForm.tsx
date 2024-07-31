"use client";
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

import AssetSelect from "~/app/_components/AssetSelect";
import RepairStatusTypeSelect from "~/app/_components/RepairStatusTypeSelect";
import RepairTypeSelect from "~/app/_components/RepairTypeSelect";

import { useCreateRepairForm } from "./useCreateRepairForm";

interface CreateRepairFormProps {}

export default function CreateRepairForm({}: CreateRepairFormProps) {
  const { form, createMutation } = useCreateRepairForm();

  return (
    <Form {...form}>
      <form
        onReset={() => { form.reset(); }}
        onSubmit={form.handleSubmit((data) => createMutation.mutateAsync(data))}
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
        <FormFooter>
          <ResetButton />
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
