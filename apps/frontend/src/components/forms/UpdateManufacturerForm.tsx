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
} from "@repo/ui/form";
import { useForm } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { toast } from "@repo/ui/sonner";
import {
  type ManufacturerFormInput,
  manufacturerFormSchema,
} from "~/validators/manufacturers.schema";
import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateManufacturerFormProps {
  manufacturerId: string;
}

export default function UpdateManufacturerForm({
  manufacturerId,
}: UpdateManufacturerFormProps) {
  const navigate = useNavigate();
  const utils = api.useUtils();
  const [manufacturer] = api.manufacturers.getById.useSuspenseQuery({
    id: manufacturerId,
  });

  const updateMutation = api.manufacturers.update.useMutation({
    async onSuccess(values) {
      await utils.manufacturers.getById.invalidate({ id: manufacturerId });
      toast.success(`Manufacturer ${values.name} updated`);
      await navigate({
        to: "/manufacturers/$manufacturerId",
        params: { manufacturerId: manufacturerId },
      });
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    values: manufacturer,
    schema: manufacturerFormSchema,
  });

  function handleValid(values: ManufacturerFormInput) {
    updateMutation.mutate({ ...values, id: manufacturerId });
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleValid)(e)}>
        <FormField
          control={form.control}
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
        <FormFooter>
          <ResetButton />
          <SubmitButton />
        </FormFooter>
      </form>
    </Form>
  );
}
