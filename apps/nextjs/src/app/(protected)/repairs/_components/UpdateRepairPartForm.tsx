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
import {
  type RepairPartFormInput,
  repairPartFormSchema,
} from "@repo/validators/client/repairParts.schema";
import { useRouter } from "next/navigation";

import ModelPartSelect from "~/components/selects/ModelPartSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateRepairPartFormProps {
  repairPartId: RepairPartID;
}

export default function UpdateRepairPartForm({
  repairPartId,
}: UpdateRepairPartFormProps) {
  const [repairPart] = api.repairParts.getById.useSuspenseQuery({
    id: repairPartId,
  });
  const router = useRouter();
  const utils = api.useUtils();
  const updateMutation = api.repairParts.update.useMutation({
    async onSuccess(data) {
      await utils.repairParts.getAllByRepairId.invalidate({
        id: data.repairId,
      });
      toast.success(`Repair Part updated`);
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: repairPart,
    schema: repairPartFormSchema,
  });

  async function onValid(values: RepairPartFormInput) {
    updateMutation.mutate({ ...values, id: repairPartId });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={(e) => void form.handleSubmit(onValid)(e)}
      >
        <FormField
          control={form.control}
          name="partId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Part</FormLabel>
                <FormControl>
                  <ModelPartSelect
                    modelId={repairPart.assets.modelId}
                    {...field}
                  />
                </FormControl>
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
        <FormField
          control={form.control}
          name="installed"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
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

        <FormFooter>
          <ResetButton />
          <SubmitButton isLoading={updateMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
