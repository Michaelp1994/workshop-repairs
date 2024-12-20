"use client";
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
import {
  type RepairFormInput,
  repairFormSchema,
} from "@repo/validators/client/repair.schema";
import { useRouter } from "next/navigation";

import AssetSelect from "~/components/selects/AssetSelect";
import ClientSelect from "~/components/selects/ClientSelect";
import RepairStatusTypeSelect from "~/components/selects/RepairStatusTypeSelect";
import RepairTypeSelect from "~/components/selects/RepairTypeSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateRepairFormProps {
  repairId: RepairID;
}

export default function UpdateRepairForm({ repairId }: UpdateRepairFormProps) {
  const utils = api.useUtils();
  const router = useRouter();
  const [repair] = api.repairs.getById.useSuspenseQuery({
    id: repairId,
  });
  const updateMutation = api.repairs.update.useMutation({
    async onSuccess() {
      await utils.repairs.getById.invalidate({ id: repairId });
      toast.success("Repair updated successfully");
      router.push(`/repairs/${repairId}`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: repair,
    schema: repairFormSchema,
  });

  function handleValid(data: RepairFormInput) {
    updateMutation.mutate({ ...data, id: repairId });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onReset={() => {
          form.reset();
        }}
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
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
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <ClientSelect className="min-w-[300px]" {...field} />
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
        <FormFooter>
          <ResetButton />
          <SubmitButton
            disabled={!form.formState.isDirty}
            isLoading={updateMutation.isPending}
          />
        </FormFooter>
      </form>
    </Form>
  );
}
