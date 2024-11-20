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
import displayMutationErrors from "~/utils/displayMutationErrors";

import FileInput from "./FileInput";

export default function CreateOrganizationForm() {
  const router = useRouter();
  const utils = api.useUtils();
  const [file, setFile] = useState<null | File>(null);
  const createMutation = api.userOnboardings.createOrganization.useMutation({
    async onSuccess({ url, ...session }) {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload logo.");
      }
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

  function handleValid(values: CreateOrganizationInput) {
    if (!file) {
      return form.setError("logo", {
        message: "Please upload your logo again.",
      });
    }
    createMutation.mutate({
      name: values.name,
      logo: file?.name,
    });
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
                  <FileInput {...field} setFile={setFile} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <SubmitButton isLoading={createMutation.isPending} />
      </form>
    </Form>
  );
}
