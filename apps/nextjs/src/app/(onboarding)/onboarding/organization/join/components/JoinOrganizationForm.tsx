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
  defaultJoinOrganization,
  type JoinOrganizationInput,
  joinOrganizationSchema,
} from "@repo/validators/client/organization.schema";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function JoinOrganizationForm() {
  const router = useRouter();
  const utils = api.useUtils();
  const joinMutation = api.userOnboardings.joinOrganization.useMutation({
    async onSuccess({ organization }) {
      await utils.userOnboardings.getStatus.invalidate();
      toast.success(`You have succesfully joined ${organization.name}!`);
      router.push("/dashboard");
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    schema: joinOrganizationSchema,
    defaultValues: defaultJoinOrganization,
  });

  function handleValid(data: JoinOrganizationInput) {
    joinMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
        <FormField
          name="joinCode"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Join Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <SubmitButton isLoading={joinMutation.isPending} />
      </form>
    </Form>
  );
}
