"use client";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useForm,
  Form,
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
            onSubmit={form.handleSubmit((values) =>
              updateMutation.mutateAsync(values),
            )}
            onReset={() => form.reset()}
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
            <div className="mt-4 flex justify-end gap-4">
              {form.formState.isDirty && (
                <>
                  <Button variant="ghost" type="reset">
                    Reset
                  </Button>
                  <Button type="submit">Update</Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
