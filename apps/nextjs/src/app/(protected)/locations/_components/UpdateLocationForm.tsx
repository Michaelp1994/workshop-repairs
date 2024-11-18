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

import { api } from "~/trpc/client";

interface UpdateLocationFormProps {
  locationId: LocationID;
}

export default function UpdateLocationForm({
  locationId,
}: UpdateLocationFormProps) {
  const [location] = api.locations.getById.useSuspenseQuery({
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
    values: location,
    schema: locationFormSchema,
  });

  function handleValid(values: LocationFormInput) {
    updateMutation.mutate({ ...values, id: locationId });
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
