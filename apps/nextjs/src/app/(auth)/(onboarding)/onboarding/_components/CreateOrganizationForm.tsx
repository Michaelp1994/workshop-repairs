"use client";
import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  SubmitButton,
  useForm,
} from "@repo/ui/form";
import { Upload } from "@repo/ui/icons";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import {
  type CreateOrganizationInput,
  createOrganizationSchema,
  defaultOrganization,
} from "@repo/validators/forms/organization.schema";
import Image from "next/image";
import { type ChangeEvent, useRef, useState } from "react";

import { api } from "~/trpc/client";

interface OnboardingFormProps {
  onSuccess: (invitationId: string) => void;
}

export default function OnboardingForm({ onSuccess }: OnboardingFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<null | string>(null);
  const createMutation = api.organizations.create.useMutation({
    async onSuccess(data) {
      toast.success("Organization created.");
      onSuccess(data.invitationId);
    },
    async onError(data) {
      toast.error("Can't Create organization.");
    },
  });
  const form = useForm({
    schema: createOrganizationSchema,
    defaultValues: defaultOrganization,
  });

  function invalidFile(message: string) {
    fileRef.current.value = "";
    form.setError("logo", {
      message,
    });
    setPreview(null);
  }

  async function handleUploadFile(event: ChangeEvent<HTMLInputElement>) {
    form.clearErrors("logo");
    const file = event.target.files[0];
    if (!file) {
      invalidFile("Please select an image for your logo.");
      return;
    }
    if (!file.type.startsWith("image")) {
      invalidFile("Must be an image file.");
      return;
    }

    if (file.size > 10_000_000) {
      invalidFile("Must be less than 10MB");
      return;
    }
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
  }

  async function handleValid(data: CreateOrganizationInput) {
    // TODO: handle file upload

    await createMutation.mutateAsync({
      name: data.name,
      logo: data.logo,
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
        <FormField
          name="logo"
          render={({ field: { ref, ...field } }) => {
            return (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <div className="flex h-20 flex-row items-center gap-2 pt-2">
                  {preview ? (
                    <Image
                      alt="Profile Photo"
                      height={100}
                      src={preview}
                      width={100}
                    />
                  ) : (
                    <Button
                      className="h-[100px] w-[100px] border border-dashed border-gray-400"
                      onClick={() => fileRef.current.click()}
                      type="button"
                      variant="secondary"
                    >
                      <Upload className="text-gray-400" />
                    </Button>
                  )}

                  <div className="space-y-2">
                    <FormControl>
                      <Input
                        ref={(e) => {
                          ref(e);
                          fileRef.current = e;
                        }}
                        type="file"
                        {...field}
                        onChange={(e) => {
                          handleUploadFile(e);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="pl-2">
                      Recommended size 1:1, up to 10MB.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            );
          }}
        />
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

        <SubmitButton isLoading={createMutation.isPending} />
      </form>
    </Form>
  );
}
