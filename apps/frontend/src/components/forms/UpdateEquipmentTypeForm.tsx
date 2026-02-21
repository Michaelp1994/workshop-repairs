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
  type EquipmentTypeFormInput,
  equipmentTypeFormSchema,
} from "@repo/validators/client/equipmentTypes.schema";
import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface UpdateEquipmentTypeFormProps {
  slug: string;
}

export default function UpdateEquipmentTypeForm({
  slug,
}: UpdateEquipmentTypeFormProps) {
  const navigate = useNavigate();
  const utils = api.useUtils();
  const [equipmentType] = api.equipmentTypes.getBySlug.useSuspenseQuery({
    slug,
  });

  const updateMutation = api.equipmentTypes.update.useMutation({
    async onSuccess(data) {
      await utils.equipmentTypes.getBySlug.invalidate({
        slug,
      });
      toast.success(`Updated Equipment Type: ${data.name}`);
      await navigate({
        to: "/equipment-types/$equipmentTypeSlug",
        params: { equipmentTypeSlug: slug },
      });
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    schema: equipmentTypeFormSchema,
    values: equipmentType,
  });

  function handleValid(values: EquipmentTypeFormInput) {
    updateMutation.mutate({ ...values, slug });
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
          <SubmitButton isLoading={updateMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
