"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import { Textarea } from "@repo/ui/textarea";

import ClientSelect from "~/app/_components/ClientSelect";
import RepairTypeSelect from "~/app/_components/RepairTypeSelect";
import { repairFormSchema } from "~/schemas";
import { api } from "~/trpc/react";

interface UpdateRepairFormProps {
  repairId: RepairID;
}

export default function UpdateRepairForm({ repairId }: UpdateRepairFormProps) {
  const { isLoading, isError, data, error, refetch } =
    api.repairs.getById.useQuery({
      id: repairId,
    });
  const updateMutation = api.repairs.update.useMutation({
    async onSuccess() {
      await refetch();
      toast.success("Repair updated successfully");
    },
    onError() {
      toast.error("Failed to update repair");
    },
  });

  const form = useForm({
    values: data,
    schema: repairFormSchema,
  });

  const handleUpdate = form.handleSubmit((data) =>
    { updateMutation.mutate({ ...data, id: repairId }); },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    console.log(error);
    return <div>Error</div>;
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onReset={() => { form.reset(); }}
        onSubmit={handleUpdate}
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
        <div className="mt-4 flex justify-end gap-4">
          {form.formState.isDirty && (
            <>
              <Button type="reset" variant="ghost">
                Reset
              </Button>
              <Button type="submit">Update</Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
