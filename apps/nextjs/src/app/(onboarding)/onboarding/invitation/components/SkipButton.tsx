"use client";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function SkipButton() {
  const router = useRouter();
  const utils = api.useUtils();
  const skipMutation = api.userOnboardings.skipInvitations.useMutation({
    async onSuccess() {
      await utils.userOnboardings.getStatus.invalidate();
      router.push("/dashboard");
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
