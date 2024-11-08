"use client";
import { Button } from "@repo/ui/button";
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
import { Chain } from "@repo/ui/icons";
import { toast } from "@repo/ui/sonner";
import { Textarea } from "@repo/ui/textarea";
import {
  defaultInviteOthers,
  type InviteOthersInput,
  inviteOthersSchema,
} from "@repo/validators/forms/organization.schema";
import { useState } from "react";

import { api } from "~/trpc/client";

interface InviteOthersFormProps {
  invitationId: string;
  onSuccess: () => void;
}

export default function InviteOthersForm({
  invitationId,
  onSuccess,
}: InviteOthersFormProps) {
  const [copied, setCopied] = useState(false);
  const inviteMutation = api.organizations.inviteOthers.useMutation({
    async onSuccess() {
      toast.success("Your invitations have been sent.");
      onSuccess();
    },
    async onError() {
      toast.error("Can't Send invitations.");
    },
  });
  function skipStep() {
    onSuccess();
  }
  const form = useForm({
    schema: inviteOthersSchema,
    defaultValues: defaultInviteOthers,
  });

  function copyInvitationLink() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_DOMAIN}/public-invite/${invitationId}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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
                    placeholder="Example michael@gmail.com, jack@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex justify-end gap-2">
          <Button onClick={skipStep} type="button" variant="link">
            Skip
          </Button>
          <Button
            className="transition-all"
            onClick={copyInvitationLink}
            type="button"
            variant="outline"
          >
            <Chain className="mr-2 size-4" />
            {copied ? "Copied!" : "Copy Invitation Link"}
          </Button>

          <SubmitButton isLoading={inviteMutation.isPending} />
        </div>
      </form>
    </Form>
  );
}
