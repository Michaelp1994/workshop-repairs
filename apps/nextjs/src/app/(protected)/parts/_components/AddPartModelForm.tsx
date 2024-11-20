import type { PartID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
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
  defaultPartsToModels,
  type PartsToModelFormInput,
  partsToModelsFormSchema,
} from "@repo/validators/client/partsToModels.schema";

import ModelSelect from "~/components/selects/ModelSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface AddPartModelFormProps {
  partId: PartID;
}

export default function AddPartModelForm({ partId }: AddPartModelFormProps) {
  const createMutation = api.partsToModels.create.useMutation({
    onSuccess() {
      toast.success(`Part To Model relationship created`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    defaultValues: defaultPartsToModels,
    schema: partsToModelsFormSchema,
  });

  function handleValid(values: PartsToModelFormInput) {
    createMutation.mutate({ ...values, partId });
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
          name="modelId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
