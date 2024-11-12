"use client";
import { Button } from "@repo/ui/button";
import { LoaderCircle } from "@repo/ui/icons";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";

export default function CompleteStepButton() {
  const router = useRouter();
  const utils = api.useUtils();
  const updateMutation = api.userOnboardings.markUserAsWelcomed.useMutation({
    async onSuccess() {
      await utils.userOnboardings.getStatus.invalidate();
      router.push("/onboarding/organization");
    },
    onError(error) {
      toast.error("Failed. Please try again.");
      console.log(error);
    },
  });
  return (
    <Button
      disabled={updateMutation.isPending}
      onClick={() => updateMutation.mutate()}
    >
      {updateMutation.isPending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        "Get Started"
      )}
    </Button>
  );
}
