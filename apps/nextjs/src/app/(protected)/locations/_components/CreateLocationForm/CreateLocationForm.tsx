"use client";
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
  defaultLocation,
  type LocationFormInput,
  locationFormSchema,
} from "@repo/validators/forms/locations.schema";
import { api } from "~/trpc/react";

export default function CreateLocationForm() {
  const createMutation = api.locations.create.useMutation({
    onSuccess(data) {
      toast.success(`Location ${data.name} created`);
    },
    onError(error) {
      toast.error("Failed to create location");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultLocation,
    schema: locationFormSchema,
  });

  async function handleValid(values: LocationFormInput) {
    await createMutation.mutateAsync(values);
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
