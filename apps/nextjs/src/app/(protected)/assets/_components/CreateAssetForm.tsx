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
import {
  type AssetFormInput,
  assetFormSchema,
  defaultAsset,
} from "@repo/validators/client/assets.schema";
import { useRouter } from "next/navigation";

import AssetStatusSelect from "~/components/selects/AssetStatusSelect";
import ClientSelect from "~/components/selects/ClientSelect";
import LocationSelect from "~/components/selects/LocationSelect";
import ModelSelect from "~/components/selects/ModelSelect";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function CreateAssetForm() {
  const router = useRouter();
  const createMutation = api.assets.create.useMutation({
    onSuccess(data) {
      toast.success(`Asset ${data.assetNumber} created`);
      router.push(`/assets/${data.id}`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    defaultValues: defaultAsset,
    schema: assetFormSchema,
  });

  function handleValid(values: AssetFormInput) {
    createMutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onReset={() => form.reset()}
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
          name="softwareVersion"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Software Version</FormLabel>
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
          name="statusId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <AssetStatusSelect {...field} />
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
                  <ModelSelect {...field} />
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
          <SubmitButton isLoading={createMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
