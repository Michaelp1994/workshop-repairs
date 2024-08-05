import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import {
  defaultLogin,
  type LoginFormInput,
  loginFormSchema,
} from "~/schemas/auth.schema";
import { api } from "~/trpc/react";

export function useForgotPasswordForm() {
  const router = useRouter();
  const forgotPasswordMutation = api.auth.forgotPassword.useMutation({
    onSuccess(_, variables) {
      router.push(`/reset-password?email=${variables.email}`);
    },
    onError(error) {
      toast.error("Error, please try again later.");
      console.log(error);
    },
  });

  const form = useForm<LoginFormInput>({
    schema: loginFormSchema,
    defaultValues: defaultLogin,
    async onValid(data) {
      await forgotPasswordMutation.mutateAsync(data);
    },
  });

  return { form, ...forgotPasswordMutation };
}
