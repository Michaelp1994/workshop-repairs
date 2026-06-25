import type { PartID } from "~/validators/ids.validators";

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
} from "@repo/ui/form";
import { useForm } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import { type PartFormInput, partFormSchema } from "~/validators/parts.schema";
import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdatePartFormProps {
  partId: string;
}

export default function UpdatePartForm({ partId }: UpdatePartFormProps) {
  const navigate = useNavigate();
  const [part] = api.parts.getById.useSuspenseQuery({
    id: partId,
  });

  const updateMutation = api.parts.update.useMutation({
    async onSuccess(values) {
      await navigate({
        to: "/parts/$partId",
        params: { partId: partId },
      });
      toast.success(`Part ${values.name} updated`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: part,
    schema: partFormSchema,
  });

  function handleValid(values: PartFormInput) {
    updateMutation.mutate({ ...values, id: partId });
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="partNumber"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Part Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
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
