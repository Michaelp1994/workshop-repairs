"use client";
import type { AssetID } from "@repo/validators/ids.validators";

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
  type AssetFormInput,
  assetFormSchema,
} from "@repo/validators/forms/assets.schema";

import ClientSelect from "~/components/selects/ClientSelect";
import LocationSelect from "~/components/selects/LocationSelect";
import { api } from "~/trpc/react";

interface AssetDetailsProps {
  assetId: AssetID;
}

export default function AssetDetails({ assetId }: AssetDetailsProps) {
  const { isLoading, isError, data, refetch } = api.assets.getById.useQuery({
    id: assetId,
  });

  const updateMutation = api.assets.update.useMutation({
    async onSuccess(values) {
      toast.success(`Asset ${values.assetNumber} updated`);
      await refetch();
    },
    onError(error) {
      toast.error("Failed to update asset");
      console.log(error);
    },
  });

  async function handleValid(values: AssetFormInput) {
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
        className="space-y-4"
        onReset={() => {
          form.reset();
        }}
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
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
          name="clientId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <ClientSelect {...field} />
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
              <SubmitButton isLoading={updateMutation.isPending} />
            </>
          )}
        </FormFooter>
      </form>
    </Form>
  );
}
