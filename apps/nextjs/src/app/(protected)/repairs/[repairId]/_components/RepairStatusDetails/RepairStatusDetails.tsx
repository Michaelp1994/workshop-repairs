"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
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
import { toast } from "@repo/ui/sonner";
import { type RepairID } from "@repo/validators/ids.validators";
import { z } from "zod";

import RepairStatusTypeSelect from "~/components/RepairStatusTypeSelect";
import { api } from "~/trpc/react";

export default function RepairStatusDetails({
  repairId,
}: {
  repairId: RepairID;
}) {
  const utils = api.useUtils();
  const { data, isLoading, isError } = api.repairs.getById.useQuery({
    id: repairId,
  });
  const updateMutation = api.repairs.update.useMutation({
    async onSuccess() {
      await utils.repairs.getById.invalidate({ id: repairId });
      toast.success(`Repair Status updated`);
    },
    onError(error) {
      toast.error("Failed to update repair status");
      console.log(error);
    },
  });
  const form = useForm({
    values: data,
    schema: z.object({ statusId: z.number() }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    await updateMutation.mutateAsync({ ...values, id: repairId });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onReset={() => {
              form.reset();
            }}
            onSubmit={(e) => void handleSubmit(e)}
          >
            <FormField
              control={form.control}
              name="statusId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Current Status</FormLabel>
                    <FormControl>
                      <RepairStatusTypeSelect className="w-full" {...field} />
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
      </CardContent>
    </Card>
  );
}
