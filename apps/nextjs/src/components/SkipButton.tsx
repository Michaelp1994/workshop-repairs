import { Button } from "@repo/ui/button";
import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function SkipButton() {
  const navigate = useNavigate();
  const utils = api.useUtils();
  const skipMutation = api.userOnboardings.skipInvitations.useMutation({
    async onSuccess() {
      await utils.userOnboardings.getStatus.invalidate();
      navigate({ to: "/dashboard" });
    },
    onError(errors) {
      displayMutationErrors(errors);
    },
  });
  return (
    <Button onClick={() => skipMutation.mutate()} type="button" variant="link">
      Skip
    </Button>
  );
}
