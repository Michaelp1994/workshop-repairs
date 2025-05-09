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
} from "@repo/validators/client/locations.schema";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function CreateLocationForm() {
  const router = useRouter();
  const utils = api.useUtils();
  const createMutation = api.locations.create.useMutation({
    async onSuccess(data) {
      await utils.locations.getAll.invalidate();
      toast.success(`Location ${data.name} created`);
      router.push(`/locations/${data.id}`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    defaultValues: defaultLocation,
    schema: locationFormSchema,
  });

  function handleValid(values: LocationFormInput) {
    createMutation.mutate(values);
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
          <SubmitButton isLoading={createMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
