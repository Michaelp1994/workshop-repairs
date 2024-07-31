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
  useForm,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import LocationSelect from "~/app/_components/LocationSelect";
import ModelSelect from "~/app/_components/ModelSelect";
import { assetFormSchema, defaultAsset } from "~/schemas";
import { api } from "~/trpc/react";

interface CreateAssetFormProps {}

export default function CreateAssetForm({}: CreateAssetFormProps) {
  const router = useRouter();
  const createMutation = api.assets.create.useMutation({
    async onSuccess(data) {
      toast.success(`Asset ${data.assetNumber} created`);
      await router.push(`/assets/${data.id}`);
    },
    onError(error) {
      toast.error("Failed to create asset");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultAsset,
    schema: assetFormSchema,
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          createMutation.mutate(data);
        })}
      >
        <FormField
          control={form.control}
          name="assetNumber"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Asset Number</FormLabel>
                <FormControl>
                  <Input className="max-w-[500px]" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Serial Number</FormLabel>
                <FormControl>
                  <Input className="max-w-[500px]" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="modelId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <ModelSelect className="max-w-[500px]" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="locationId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <LocationSelect className="max-w-[500px]" {...field} />
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
