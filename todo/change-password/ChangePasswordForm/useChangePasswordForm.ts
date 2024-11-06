import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";

import {
  changePasswordFormSchema,
  defaultChangePassword,
} from "@repo/validators/forms/auth.schema";
import { api } from "~/trpc/client";

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
