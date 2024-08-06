"use client";
import type { LocationID } from "@repo/validators/ids.validators";

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
  type LocationFormInput,
  locationFormSchema,
} from "@repo/validators/forms/locations.schema";
import { api } from "~/trpc/react";

interface UpdateLocationFormProps {
  locationId: LocationID;
}

export default function UpdateLocationForm({
  locationId,
}: UpdateLocationFormProps) {
  const { isLoading, data, isError } = api.locations.getById.useQuery({
    id: locationId,
  });

  const updateMutation = api.locations.update.useMutation({
    onSuccess(values) {
      toast.success(`Location ${values.name} updated`);
    },
    onError() {
      toast.error("Failed to update location");
    },
  });

  const form = useForm({
    values: data,
    schema: locationFormSchema,
  });

  async function handleValid(values: LocationFormInput) {
    await updateMutation.mutateAsync({ ...values, id: locationId });
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
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Address</FormLabel>
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
