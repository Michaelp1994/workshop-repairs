"use client";
import type { RepairID } from "@repo/validators/ids.validators";

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
import { useRouter } from "next/navigation";

import ModelPartSelect from "~/components/selects/ModelPartSelect";
import {
  defaultRepairPart,
  type RepairPartFormInput,
  repairPartFormSchema,
} from "@repo/validators/forms/repairParts.schema";
import { api } from "~/trpc/react";

interface CreateRepairPartFormProps {
  repairId: RepairID;
}

export default function CreateRepairPartForm({
  repairId,
}: CreateRepairPartFormProps) {
  const utils = api.useUtils();
  const router = useRouter();
  const {
    data: repair,
    isLoading,
    isError,
  } = api.repairs.getById.useQuery({
    id: repairId,
  });

  const createMutation = api.repairParts.create.useMutation({
    async onSuccess() {
      await utils.repairParts.getAllByRepairId.invalidate({
        id: repairId,
      });
      toast.success(`Part was added to Repair`);
      router.back();
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

  async function handleValid(values: RepairPartFormInput) {
    await createMutation.mutateAsync({ ...values, repairId });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !repair) {
    return <div>Error</div>;
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onReset={() => {
          form.reset();
        }}
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
        <FormField
          control={form.control}
          name="partId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Part</FormLabel>
                <FormControl>
                  <ModelPartSelect modelId={repair.asset.modelId} {...field} />
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
