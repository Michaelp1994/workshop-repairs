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
import { type ModelID } from "@repo/validators/ids.validators";
import { useRouter } from "next/navigation";

import {
  defaultModelImage,
  type ModelImageFormInput,
  modelImageFormSchema,
} from "~/schemas";
import { api } from "~/trpc/react";
import { getBaseUrl } from "~/utils/getBaseUrl";

interface CreateModelImageFormProps {
  modelId: ModelID;
}

export default function CreateModelImageForm({
  modelId,
}: CreateModelImageFormProps) {
  const utils = api.useUtils();
  const router = useRouter();
  const createMutation = api.modelImages.create.useMutation({
    async onSuccess() {
      await utils.modelImages.getAllByModelId.invalidate({
        modelId,
      });
      toast.success(`Model Image uploaded`);
      router.replace(`${getBaseUrl()}/models/${modelId}`);
    },
    onError(error) {
      toast.error("Failed to create repairImage");
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: defaultModelImage,
    schema: modelImageFormSchema,
  });

  async function handleValid(values: ModelImageFormInput) {
    await createMutation.mutateAsync({ ...values, modelId });
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
          name="url"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Image Url</FormLabel>
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
          name="caption"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Caption</FormLabel>
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
