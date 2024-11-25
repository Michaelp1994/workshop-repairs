import type { RepairID } from "@repo/validators/ids.validators";

import {
  Form,
  FormControl,
  FormDescription,
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
  defaultRepairImage,
  type RepairImageFormInput,
  repairImageFormSchema,
} from "@repo/validators/client/repairImages.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/client";
import { uploadImageToS3 } from "~/utils/awsLib";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface CreateRepairImageFormProps {
  repairId: RepairID;
}

export default function CreateRepairImageForm({
  repairId,
}: CreateRepairImageFormProps) {
  const utils = api.useUtils();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const createMutation = api.repairImages.create.useMutation({
    async onSuccess() {
      await utils.repairImages.getAllByRepairId.invalidate({
        repairId,
      });
      toast.success(`Repair Image uploaded`);
      router.back();
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });
  const { mutateAsync: requestUpload } =
    api.repairImages.requestUpload.useMutation();
  const form = useForm({
    defaultValues: defaultRepairImage,
    schema: repairImageFormSchema,
  });

  async function handleValid(values: RepairImageFormInput) {
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
        repairId,
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
        className="space-y-4"
        onReset={() => form.reset()}
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
                <FormDescription className="pl-2">
                  Recommended size 1:1, up to 10MB.
                </FormDescription>
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
