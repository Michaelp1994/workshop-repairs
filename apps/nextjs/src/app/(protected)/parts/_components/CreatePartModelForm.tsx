"use client";
import type { PartID } from "@repo/validators/ids.validators";

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
  defaultPartModel,
  partModelFormSchema,
  type PartsModelFormInput,
} from "@repo/validators/client/partsToModels.schema";
import { useRouter } from "next/navigation";

import ModelSelect from "~/components/selects/ModelSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface CreatePartModelFormProps {
  partId: PartID;
}

export default function CreatePartModelForm({
  partId,
}: CreatePartModelFormProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const createMutation = api.partsToModels.create.useMutation({
    async onSuccess() {
      await utils.partsToModels.getAllModelsByPartId.invalidate({
        filters: { partId },
      });
      toast.success(`Part To Model relationship created`);
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    defaultValues: defaultPartModel,
    schema: partModelFormSchema,
  });

  function handleValid(values: PartsModelFormInput) {
    createMutation.mutate({ ...values, partId });
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
                  <ModelSelect {...field} />
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
