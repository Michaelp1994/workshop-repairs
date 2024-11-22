"use client";
import type { ModelID } from "@repo/validators/ids.validators";

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
  defaultModelPart,
  type ModelPartFormInput,
  modelPartFormSchema,
} from "@repo/validators/client/partsToModels.schema";
import { useRouter } from "next/navigation";

import PartSelect from "~/components/selects/PartSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface CreateModelPartFormProps {
  modelId: ModelID;
}

export default function CreateModelPartForm({
  modelId,
}: CreateModelPartFormProps) {
  const utils = api.useUtils();
  const router = useRouter();
  const createMutation = api.partsToModels.create.useMutation({
    async onSuccess(data) {
      await utils.partsToModels.getByIds.invalidate({
        modelId,
        partId: data.partId,
      });
      await utils.partsToModels.getAllPartsByModelId.invalidate();
      await utils.partsToModels.getAllModelsByPartId.invalidate();
      toast.success("Model Part Created");
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });
  const form = useForm({
    schema: modelPartFormSchema,
    defaultValues: defaultModelPart,
  });

  function handleValid(data: ModelPartFormInput) {
    createMutation.mutate({ ...data, modelId });
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
                  <PartSelect {...field} />
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
