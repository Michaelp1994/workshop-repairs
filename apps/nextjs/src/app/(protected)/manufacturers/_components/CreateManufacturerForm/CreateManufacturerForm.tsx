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
import { useRouter } from "next/navigation";

import {
  defaultManufacturer,
  type ManufacturerFormInput,
  manufacturerFormSchema,
} from "~/schemas/manufacturers.schema";
import { api } from "~/trpc/react";

export default function CreateManufacturerForm() {
  const router = useRouter();
  const createMutation = api.manufacturers.create.useMutation({
    onSuccess(data) {
      toast.success(`Manufacturer ${data.name} created`);
      router.push(`/manufacturers/${data.id}`);
    },
    onError(error) {
      toast.error("Failed to create manufacturer");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultManufacturer,
    schema: manufacturerFormSchema,
  });

  async function handleValid(values: ManufacturerFormInput) {
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
        <FormFooter>
          <ResetButton />
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
