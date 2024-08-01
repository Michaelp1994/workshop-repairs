"use client";
import type { RouterOutputs } from "@repo/api/root";
import type { RepairID } from "@repo/validators/ids.validators";

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
  useForm,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import { Textarea } from "@repo/ui/textarea";

import ClientSelect from "~/components/ClientSelect";
import RepairTypeSelect from "~/components/RepairTypeSelect";
import { repairFormSchema } from "~/schemas";
import { api } from "~/trpc/react";

interface UpdateRepairFormProps {
  repairId: RepairID;
}

export default function UpdateRepairForm({ repairId }: UpdateRepairFormProps) {
  const utils = api.useUtils();
  const [repair, repairQuery] = api.repairs.getById.useSuspenseQuery({
    id: repairId,
  });
  const updateMutation = api.repairs.update.useMutation({
    async onSuccess() {
      await utils.repairs.getById.invalidate({ id: repairId });
      toast.success("Repair updated successfully");
      await repairQuery.refetch();
    },
    onError() {
      toast.error("Failed to update repair");
    },
  });

  const form = useForm({
    values: repair,
    schema: repairFormSchema,
  });

  const handleSubmit = form.handleSubmit((data) => {
    updateMutation.mutate({ ...data, id: repair.id });
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onReset={() => {
          form.reset();
        }}
        onSubmit={handleSubmit}
      >
        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Repair Type</FormLabel>
                <FormControl>
                  <RepairTypeSelect className="w-[200px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <ClientSelect className="w-[200px]" {...field} />
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
                  <FormLabel>Reference No.</FormLabel>
                  <FormControl>
                    <Input className="w-[300px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="fault"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Fault Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {form.formState.isDirty && (
          <FormFooter>
            <ResetButton />
            <SubmitButton />
          </FormFooter>
        )}
      </form>
    </Form>
  );
}
