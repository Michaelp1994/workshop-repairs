import {
  defaultResetPassword,
  resetPasswordFormSchema,
} from "~/schemas/auth.schema";
import { toast } from "@repo/ui/sonner";
import { useForm } from "@repo/ui/form";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useAuth } from "../../hooks/useAuth";

export function useResetPasswordForm() {
  const router = useRouter();
  const { login } = useAuth();
  // const { email } = useSearch({ from: "/reset-password" });
  const resetMutation = api.auth.resetPassword.useMutation({
    async onSuccess(data) {
      login({ authToken: data.token, id: data.id, email: data.email });
      router.push("/change-password");
    },
    onError(error) {
      toast.error("Password reset failed");

      console.log(error);
    },
  });

  const form = useForm({
    schema: resetPasswordFormSchema,
    defaultValues: defaultResetPassword,
    async onValid(data) {
      await resetMutation.mutateAsync({ ...data, email });
    },
  });

  return form;
}
