import {
  changePasswordFormSchema,
  defaultChangePassword,
} from "~/schemas/auth.schema";
import { toast } from "@repo/ui/sonner";
import { api } from "~/trpc/react";
import { useForm } from "@repo/ui/form";

export function useChangePasswordForm() {
  const changePasswordMutation = api.auth.changePassword.useMutation({
    onSuccess() {
      toast.success("Password changed successfully");
    },
    onError(error) {
      console.log(error);
    },
  });

  const form = useForm({
    schema: changePasswordFormSchema,
    defaultValues: defaultChangePassword,
    async onValid(data) {
      await changePasswordMutation.mutateAsync({
        newPassword: data.newPassword,
      });
    },
  });

  return form;
}
