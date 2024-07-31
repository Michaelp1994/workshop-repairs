"use client";
import type { AssetID } from "@repo/validators/ids.validators";
import LocationSelect from "~/app/_components/LocationSelect";
import {
  useForm,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/form";
import { api } from "~/trpc/react";
import { toast } from "@repo/ui/sonner";
import { type AssetFormInput, assetFormSchema } from "~/schemas";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";

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
      <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => form.reset()}>
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
        <div className="mt-4 flex justify-end gap-4">
          {form.formState.isDirty && (
            <>
              <Button variant="ghost" type="reset">
                Reset
              </Button>
              <Button type="submit">Update</Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
