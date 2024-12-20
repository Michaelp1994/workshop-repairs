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
} from "@repo/validators/client/organization.schema";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function SendInvitationsForm() {
  const router = useRouter();
  const utils = api.useUtils();
  const inviteMutation = api.userOnboardings.sendInvitations.useMutation({
    async onSuccess() {
      toast.success("Your invitations have been sent.");
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

  function handleValid(data: InviteOthersInput) {
    inviteMutation.mutate({
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
