"use client";
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
  defaultRepair,
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

export default function CreateRepairForm() {
  // const searchParams = useSearchParams();
  // const assetId = searchParams.get("assetId");
  const router = useRouter();
  const createMutation = api.repairs.create.useMutation({
    onSuccess(values) {
      toast.success(`Repair created`);
      router.push(`/repairs/${values.id}`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    schema: repairFormSchema,
    defaultValues: {
      ...defaultRepair,
      // assetId: assetId ? Number(assetId) : defaultRepair.assetId,
    },
  });

  function handleValid(data: RepairFormInput) {
    createMutation.mutate(data);
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
          name="typeId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Repair Type</FormLabel>
                <FormControl>
                  <RepairTypeSelect {...field} />
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
                    <ClientSelect className="w-[500px]" {...field} />
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
                  <FormLabel>Client Reference Number</FormLabel>
                  <FormControl>
                    <Input className="w-[500px]" {...field} />
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
                  {<RepairStatusTypeSelect {...field} />}
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
                <FormLabel>Fault</FormLabel>
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
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
