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
} from "@repo/validators/forms/organization.schema";
import { useRouter } from "next/navigation";

import { useAuth } from "~/auth/AuthContext";
import { api } from "~/trpc/client";
import displayFormErrors from "~/utils/displayFormErrors";

export default function JoinOrganizationForm() {
  const router = useRouter();
  const utils = api.useUtils();
  const { setAuth } = useAuth();
  const joinMutation = api.userOnboardings.joinOrganization.useMutation({
    async onSuccess({ organization, ...values }) {
      await setAuth(values);
      await utils.userOnboardings.getStatus.invalidate();
      toast.success(`You have succesfully joined ${organization.name}!`);
      router.push("/dashboard");
    },
    async onError(errors) {
      displayFormErrors(errors, form);
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
