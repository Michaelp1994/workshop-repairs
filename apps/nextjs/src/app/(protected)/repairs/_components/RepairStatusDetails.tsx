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

import RepairStatusTypeSelect from "~/components/selects/RepairStatusTypeSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

const schema = z.object({ statusId: z.number() });

type UpdateRepairStatusFormInput = z.infer<typeof schema>;

export default function RepairStatusDetails({
  repairId,
}: {
  repairId: RepairID;
}) {
  const utils = api.useUtils();
  const [repair] = api.repairs.getById.useSuspenseQuery({
    id: repairId,
  });

  const updateMutation = api.repairs.update.useMutation({
    async onSuccess() {
      await utils.repairs.getById.invalidate({ id: repairId });
      toast.success(`Repair Status updated`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: repair,
    schema,
  });

  function handleValid(values: UpdateRepairStatusFormInput) {
    updateMutation.mutate({ ...values, id: repairId });
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
            onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
          >
            <FormField
              control={form.control}
              name="statusId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Current Status</FormLabel>
                    <FormControl>
                      <RepairStatusTypeSelect {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {form.formState.isDirty && (
              <FormFooter>
                <ResetButton />
                <SubmitButton isLoading={updateMutation.isPending} />
              </FormFooter>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
