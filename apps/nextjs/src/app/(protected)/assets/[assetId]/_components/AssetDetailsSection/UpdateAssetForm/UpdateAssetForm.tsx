"use client";
import type { AssetID } from "@repo/validators/ids.validators";

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

import LocationSelect from "~/components/LocationSelect";
import { type AssetFormInput, assetFormSchema } from "~/schemas";
import { api } from "~/trpc/react";

interface AssetDetailsProps {
  assetId: AssetID;
}

export default function AssetDetails({ assetId }: AssetDetailsProps) {
  const { isLoading, isError, data } = api.assets.getById.useQuery({
    id: assetId,
  });

  const updateMutation = api.assets.update.useMutation({
    async onSuccess(values) {
      toast.success(`Asset ${values.assetNumber} updated`);
    },
    onError(error) {
      toast.error("Failed to update asset");
      console.log(error);
    },
  });

  async function onSubmit(values: AssetFormInput) {
    await updateMutation.mutateAsync({ ...values, id: assetId });
  }

  const form = useForm({
    values: data,
    schema: assetFormSchema,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Form {...form}>
      <form
        onReset={() => {
          form.reset();
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="assetNumber"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Asset Number</FormLabel>
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
          name="serialNumber"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Serial Number</FormLabel>
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
          name="locationId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <LocationSelect {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormFooter>
          {form.formState.isDirty && (
            <>
              <ResetButton />

              <SubmitButton />
            </>
          )}
        </FormFooter>
      </form>
    </Form>
  );
}
