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
import { toast } from "@repo/ui/sonner";
import { type AssetID, assetStatusId } from "@repo/validators/ids.validators";
import { z } from "zod";

import AssetStatusSelect from "~/components/selects/AssetStatusSelect";
import { api } from "~/trpc/client";

interface UpdateAssetStatusFormProps {
  assetId: AssetID;
}

const schema = z.object({
  statusId: assetStatusId,
});

type UpdateAssetStatusFormInput = z.infer<typeof schema>;

export default function UpdateAssetStatusForm({
  assetId,
}: UpdateAssetStatusFormProps) {
  const { data, isLoading, isError, refetch } = api.assets.getById.useQuery({
    id: assetId,
  });

  const updateMutation = api.assets.update.useMutation({
    async onSuccess() {
      toast.success(`Asset ${assetId} updated`);
      await refetch();
    },
    onError(errors) {
      displayFormErrors(errors, form);
    },
  });

  const form = useForm({
    values: data,
    schema,
  });

  function handleValid(values: UpdateAssetStatusFormInput) {
    updateMutation.mutate({ ...values, id: assetId });
  }

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
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
        <FormField
          control={form.control}
          name="statusId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="sr-only">Status</FormLabel>
                <FormControl>
                  <AssetStatusSelect {...field} />
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