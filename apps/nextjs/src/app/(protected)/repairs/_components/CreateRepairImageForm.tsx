import type { RepairID } from "@repo/validators/ids.validators";

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
  defaultRepairImage,
  type RepairImageFormInput,
  repairImageFormSchema,
} from "@repo/validators/forms/repairImages.schema";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface CreateRepairImageFormProps {
  repairId: RepairID;
}

function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export default function CreateRepairImageForm({
  repairId,
}: CreateRepairImageFormProps) {
  const utils = api.useUtils();
  const router = useRouter();
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

  const form = useForm({
    defaultValues: defaultRepairImage,
    schema: repairImageFormSchema,
  });

  function handleValid(values: RepairImageFormInput) {
    const image = await convertToBase64(values.image);
    console.log(image);
    // createMutation.mutate({ ...values, image, repairId });
  }
  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
          name="image"
          render={({ value, onChange, ...rest }) => {
            return (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => onChange(e.target.files[0])}
                    type="file"
                    value={value?.fileName}
                    {...rest}
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
