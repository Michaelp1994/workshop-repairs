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
import { ImageInput } from "@repo/ui/image-input";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import {
  defaultModelImage,
  type ModelImageFormInput,
  modelImageFormSchema,
} from "@repo/validators/client/modelImages.schema";
import { type ModelID } from "@repo/validators/ids.validators";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/client";
import { uploadImageToS3 } from "~/utils/awsLib";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface CreateModelImageFormProps {
  modelId: ModelID;
}

export default function CreateModelImageForm({
  modelId,
}: CreateModelImageFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: requestUpload } =
    api.modelImages.requestUpload.useMutation();
  const router = useRouter();
  const utils = api.useUtils();

  const createMutation = api.modelImages.create.useMutation({
    async onSuccess() {
      await utils.modelImages.getAllByModelId.invalidate({
        modelId,
      });
      toast.success(`Model Image uploaded`);
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });
  const form = useForm({
    defaultValues: defaultModelImage,
    schema: modelImageFormSchema,
  });

  async function handleValid(values: ModelImageFormInput) {
    setIsLoading(true);
    const { url, fileName } = await requestUpload({
      fileType: values.image.type,
      fileSize: values.image.size,
    });
    try {
      await uploadImageToS3(values.image, url);
      await createMutation.mutateAsync({
        caption: values.caption,
        fileName,
        modelId,
      });
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onReset={() => {
          form.reset();
        }}
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageInput {...field} />
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
          <SubmitButton isLoading={isLoading} />
        </FormFooter>
      </form>
    </Form>
  );
}
