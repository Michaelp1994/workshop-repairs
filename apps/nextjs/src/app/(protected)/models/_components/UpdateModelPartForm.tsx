"use client";
import type { ModelID, PartID } from "@repo/validators/ids.validators";

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
import {
  type ModelPartFormInput,
  modelPartFormSchema,
} from "@repo/validators/client/partsToModels.schema";
import { useRouter } from "next/navigation";

import PartSelect from "~/components/selects/PartSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateModelPartFormProps {
  modelId: ModelID;
  partId: PartID;
}

export default function UpdateModelPartForm({
  modelId,
  partId,
}: UpdateModelPartFormProps) {
  const utils = api.useUtils();
  const router = useRouter();
  const [partToModel] = api.partsToModels.getByIds.useSuspenseQuery({
    modelId,
    partId,
  });
  const updateMutation = api.partsToModels.update.useMutation({
    async onSuccess() {
      await utils.partsToModels.getByIds.invalidate({ modelId, partId });
      await utils.partsToModels.getAllPartsByModelId.invalidate();
      await utils.partsToModels.getAllModelsByPartId.invalidate();
      toast.success("Model Part Updated");
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });
  const form = useForm({
    schema: modelPartFormSchema,
    values: partToModel,
  });

  function handleValid(data: ModelPartFormInput) {
    updateMutation.mutate({ ...data, modelId, partId });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onReset={() => form.reset()}
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
                  <PartSelect disabled {...field} />
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
        <FormFooter>
          <ResetButton />
          <SubmitButton isLoading={updateMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
