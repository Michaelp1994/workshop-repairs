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
  type ClientFormInput,
  clientFormSchema,
  defaultClient,
} from "@repo/validators/client/clients.schema";
import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function CreateClientForm() {
  const navigate = useNavigate();
  const createMutation = api.clients.create.useMutation({
    onSuccess(data) {
      toast.success(`Client created`);
      navigate(`/clients/${data.id}`);
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    defaultValues: defaultClient,
    schema: clientFormSchema,
  });

  function handleValid(values: ClientFormInput) {
    createMutation.mutate(values);
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
          <SubmitButton isLoading={createMutation.isPending} />
        </FormFooter>
      </form>
    </Form>
  );
}
