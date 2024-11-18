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
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateAssetFormProps {
  assetId: AssetID;
}

export default function UpdateAssetForm({ assetId }: UpdateAssetFormProps) {
  const [asset] = api.assets.getById.useSuspenseQuery({
    id: assetId,
  });

  const updateMutation = api.assets.update.useMutation({
    async onSuccess(values) {
      toast.success(`Asset ${values.assetNumber} updated`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  function handleValid(values: AssetFormInput) {
    updateMutation.mutate({ ...values, id: assetId });
  }

  const form = useForm({
    values: asset,
    schema: assetFormSchema,
  });

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
          <ResetButton />
          <SubmitButton isLoading={updateMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
