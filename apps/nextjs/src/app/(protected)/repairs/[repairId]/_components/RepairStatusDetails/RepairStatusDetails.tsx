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
  useForm,
} from "@repo/ui/form";
import { type RepairID } from "@repo/validators/ids.validators";
import { z } from "zod";

import RepairStatusTypeSelect from "~/app/_components/RepairStatusTypeSelect";
import { api } from "~/trpc/react";

export default function RepairStatusDetails({
  repairId,
}: {
  repairId: RepairID;
}) {
  const { data, isLoading, isError } = api.repairs.getById.useQuery({
    id: repairId,
  });
  const updateMutation = api.repairs.update.useMutation();
  const form = useForm({
    values: data,
    schema: z.object({ statusId: z.number() }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
            onSubmit={form.handleSubmit((values) =>
              updateMutation.mutateAsync(values),
            )}
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
