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
  partModelFormSchema,
  type PartsModelFormInput,
} from "@repo/validators/client/partsToModels.schema";
import { useRouter } from "next/navigation";

import ModelSelect from "~/components/selects/ModelSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdatePartModelFormProps {
  partId: PartID;
  modelId: ModelID;
}

export default function UpdatePartModelForm({
  partId,
  modelId,
}: UpdatePartModelFormProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [partModel] = api.partsToModels.getByIds.useSuspenseQuery({
    partId,
    modelId,
  });
  const createMutation = api.partsToModels.update.useMutation({
    async onSuccess() {
      await utils.partsToModels.getByIds.invalidate({ modelId, partId });
      await utils.partsToModels.getAllPartsByModelId.invalidate();
      await utils.partsToModels.getAllModelsByPartId.invalidate();
      toast.success(`Part To Model relationship updated`);
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: partModel,
    schema: partModelFormSchema,
  });

  function handleValid(values: PartsModelFormInput) {
    createMutation.mutate({ ...values, partId, modelId });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
        <FormField
          control={form.control}
          name="modelId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <ModelSelect disabled {...field} />
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
          <SubmitButton isLoading={createMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
