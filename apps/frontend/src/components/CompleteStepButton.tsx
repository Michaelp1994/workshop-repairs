import { Button } from "@repo/ui/button";
import { LoaderCircle } from "@repo/ui/icons";
import { toast } from "@repo/ui/sonner";
import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function CompleteStepButton() {
  const navigate = useNavigate();
  const utils = api.useUtils();
  const updateMutation = api.userOnboardings.markUserAsWelcomed.useMutation({
    async onSuccess() {
      await utils.userOnboardings.getStatus.invalidate();
      await navigate({ to: "/onboarding/organization" });
    },
    onError(errors) {
      displayMutationErrors(errors);
      toast.error("Failed. Please try again.");
    },
  });
  return (
    <Button
      disabled={updateMutation.isPending}
      onClick={() => {
        updateMutation.mutate();
      }}
    >
      {updateMutation.isPending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        "Get Started"
      )}
    </Button>
  );
}
