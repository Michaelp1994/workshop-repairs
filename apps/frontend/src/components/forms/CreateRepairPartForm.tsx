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
  defaultRepairPart,
  type RepairPartFormInput,
  repairPartFormSchema,
} from "@repo/validators/client/repairParts.schema";

import ModelPartSelect from "~/components/selects/ModelPartSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface CreateRepairPartFormProps {
  repairId: string;
}

export default function CreateRepairPartForm({
  repairId,
}: CreateRepairPartFormProps) {
  const utils = api.useUtils();
  const [repair] = api.repairs.getById.useSuspenseQuery({
    id: repairId,
  });

  const createMutation = api.repairParts.create.useMutation({
    async onSuccess() {
      await utils.repairParts.getAll.invalidate();
      await utils.repairParts.countAll.invalidate();
      toast.success(`Part was added to ${repairId}`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    defaultValues: defaultRepairPart,
    schema: repairPartFormSchema,
  });

  function handleValid(values: RepairPartFormInput) {
    createMutation.mutate({ ...values, repairId: repairId });
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
                  <ModelPartSelect modelId={repair.model.id.toString()} {...field} />
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
              <FormItem className="flex flex-row items-center space-y-0 space-x-3 rounded-md border p-4">
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
          <SubmitButton isLoading={createMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
