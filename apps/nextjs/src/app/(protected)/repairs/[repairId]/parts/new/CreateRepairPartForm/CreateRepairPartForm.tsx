"use client";
import type { RepairPartID } from "@repo/validators/ids.validators";

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
  useForm,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";

import ModelPartSelect from "~/components/ModelPartSelect";
import {
  defaultRepairPart,
  repairPartFormSchema,
} from "~/schemas/repairParts.schema";
import { api } from "~/trpc/react";

interface CreateRepairPartFormProps {
  repairId: RepairPartID;
}

export default function CreateRepairPartForm({
  repairId,
}: CreateRepairPartFormProps) {
  const utils = api.useUtils();

  const createMutation = api.repairParts.create.useMutation({
    async onSuccess() {
      await utils.repairParts.getAllByRepairId.invalidate({
        id: repairId,
      });
      toast.success(`Part was added to Repair`);
    },
    onError(error) {
      toast.error("Failed to create repair Part");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultRepairPart,
    schema: repairPartFormSchema,
  });
  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onReset={() => {
          form.reset();
        }}
        onSubmit={form.handleSubmit(async (values) => {
          await createMutation.mutateAsync({ ...values, repairId });
        })}
      >
        <FormField
          control={form.control}
          name="partId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Part</FormLabel>
                <FormControl>
                  <ModelPartSelect repairId={repairId} {...field} />
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Installed</FormLabel>
                  <FormDescription>
                    Select this checkbox if the part has already been installed
                  </FormDescription>
                </div>
                <FormMessage />
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
      </form>
    </Form>
  );
}
