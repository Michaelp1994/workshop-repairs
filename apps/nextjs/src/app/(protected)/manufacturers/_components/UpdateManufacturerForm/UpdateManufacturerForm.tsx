"use client";
import type { ManufacturerID } from "@repo/validators/ids.validators";

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
import {
  type ManufacturerFormInput,
  manufacturerFormSchema,
} from "@repo/validators/forms/manufacturers.schema";

import { api } from "~/trpc/client";

interface UpdateManufacturerFormProps {
  manufacturerId: ManufacturerID;
}

export default function UpdateManufacturerForm({
  manufacturerId,
}: UpdateManufacturerFormProps) {
  const { data, isLoading, isError } = api.manufacturers.getById.useQuery({
    id: manufacturerId,
  });

  const updateMutation = api.manufacturers.update.useMutation({
    onSuccess(values) {
      toast.success(`Manufacturer ${values.name} updated`);
    },
    onError() {
      toast.error("Failed to create manufacturer");
    },
  });

  const form = useForm({
    values: data,
    schema: manufacturerFormSchema,
  });

  async function handleValid(values: ManufacturerFormInput) {
    await updateMutation.mutateAsync({ ...values, id: manufacturerId });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
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
        <FormFooter>
          <ResetButton />
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
