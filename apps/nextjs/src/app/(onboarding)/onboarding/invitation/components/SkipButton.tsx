import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { useAuth } from "~/auth/AuthContext";
import { api } from "~/trpc/client";

export default function SkipButton() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const utils = api.useUtils();
  const skipMutation = api.userOnboardings.skipInvitations.useMutation({
    async onSuccess(values) {
      await setAuth(values);
      await utils.userOnboardings.getStatus.invalidate();
      router.push("/dashboard");
    },
    async onError() {
      toast.error("Can't Skip Step.");
    },
  });
  return (
    <Button onClick={() => skipMutation.mutate()} type="button" variant="link">
      Skip
    </Button>
  );
}
