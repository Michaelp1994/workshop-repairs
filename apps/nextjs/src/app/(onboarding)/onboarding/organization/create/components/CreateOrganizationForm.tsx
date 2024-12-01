"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  SubmitButton,
  useForm,
} from "@repo/ui/form";
import { ImageInput } from "@repo/ui/image-input";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import {
  type CreateOrganizationInput,
  createOrganizationSchema,
  defaultOrganization,
} from "@repo/validators/client/organization.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/client";
import { uploadImageToS3 } from "~/utils/awsLib";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function CreateOrganizationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: requestUpload } =
    api.userOnboardings.requestUpload.useMutation({
      onError(errors) {
        displayMutationErrors(errors, form);
      },
    });
  const router = useRouter();
  const utils = api.useUtils();
  const createMutation = api.userOnboardings.createOrganization.useMutation({
    async onSuccess() {
      await utils.userOnboardings.getStatus.invalidate();
      toast.success("Organization created.");
      router.push("/onboarding/invitation");
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });
  const form = useForm({
    schema: createOrganizationSchema,
    defaultValues: defaultOrganization,
  });

  async function handleValid(values: CreateOrganizationInput) {
    setIsLoading(true);
    try {
      const { url, fileName } = await requestUpload({
        name: values.name,
        fileType: values.logo.type,
        fileSize: values.logo.size,
      });
      await uploadImageToS3(values.logo, url);
      await createMutation.mutateAsync({
        name: values.name,
        logo: fileName,
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
        className="flex flex-col gap-5"
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
        <FormField
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="logo"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <ImageInput {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
}
