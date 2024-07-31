"use client";
import { Button } from "@repo/ui/button";
import { ChevronLeft } from "@repo/ui/icons";
import { useRouter } from "next/navigation";

export function BackButton() {
  "use client";
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-7 w-7"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Back</span>
    </Button>
  );
}
