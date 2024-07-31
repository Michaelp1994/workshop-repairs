import { useForm } from "@repo/ui/form";
import { toast } from "@repo/ui/sonner";

import { defaultProfile, updateProfileFormSchema } from "~/schemas/auth.schema";
import { api } from "~/trpc/react";

export function useProfileForm() {
  const query = api.users.getCurrentUser.useQuery({});

  const updateMutation = api.users.updateCurrent.useMutation({
    onSuccess() {
      toast.success("Your profile has been updated");
    },
    onError(error) {
      toast.error("Unable to update profile");
      console.log(error);
    },
  });

  const form = useForm({
    schema: updateProfileFormSchema,
    values: query.data ?? defaultProfile,
    async onValid(data) {
      await updateMutation.mutateAsync(data);
    },
  });

  return form;
}
