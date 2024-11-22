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
import {
  defaultModelImage,
  type ModelImageFormInput,
  modelImageFormSchema,
} from "@repo/validators/client/modelImages.schema";
import { type ModelID } from "@repo/validators/ids.validators";
import { useRef } from "react";

// import { uploadModelImage } from "~/app/actions";

interface CreateModelImageFormProps {
  modelId: ModelID;
}

export default function CreateModelImageForm({
  modelId,
}: CreateModelImageFormProps) {
  // const uploadModelImageWithId = uploadModelImage.bind(null, modelId);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm({
    defaultValues: defaultModelImage,
    schema: modelImageFormSchema,
  });

  function handleValid(values: ModelImageFormInput) {
    formRef.current?.submit();
  }

  return (
    <Form {...form}>
      <form
        action={uploadModelImageWithId}
        className="space-y-8"
        onReset={() => {
          form.reset();
        }}
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
        ref={formRef}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            const { value, onChange, ...rest } = field;
            return (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    {...rest}
                    onChange={(e) => onChange(e.target.files[0])}
                    type="file"
                    value={value?.fileName}
                  />
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
