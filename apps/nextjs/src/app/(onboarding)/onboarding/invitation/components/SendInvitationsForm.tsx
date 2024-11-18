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
import { toast } from "@repo/ui/sonner";
import { Textarea } from "@repo/ui/textarea";
import {
  defaultInviteOthers,
  type InviteOthersInput,
  inviteOthersSchema,
} from "@repo/validators/forms/organization.schema";
import { useRouter } from "next/navigation";

import { useAuth } from "~/auth/AuthContext";
import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function SendInvitationsForm() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const utils = api.useUtils();
  const inviteMutation = api.userOnboardings.sendInvitations.useMutation({
    async onSuccess(values) {
      toast.success("Your invitations have been sent.");
      await setAuth(values);
      await utils.userOnboardings.getStatus.invalidate();
      router.push("/dashboard");
    },
    onError(errors) {
      displayMutationErrors(errors, form);
    },
  });

  const form = useForm({
    schema: inviteOthersSchema,
    defaultValues: defaultInviteOthers,
  });

  async function handleValid(data: InviteOthersInput) {
    await inviteMutation.mutateAsync({
      emails: data.email,
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
      >
        <FormField
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Add Collegues by email</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Example michael@gmail.com, bob@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex justify-end gap-2">
          <SubmitButton isLoading={inviteMutation.isPending} />
        </div>
      </form>
    </Form>
  );
}
