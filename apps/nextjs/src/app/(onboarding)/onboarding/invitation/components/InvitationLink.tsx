"use client";
import { Button } from "@repo/ui/button";
import { Chain } from "@repo/ui/icons";
import { useState } from "react";

export default function InvitationLink() {
  const [copied, setCopied] = useState(false);

  function copyInvitationLink() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/public-invite/`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <Button
      className="transition-all"
      onClick={copyInvitationLink}
      type="button"
      variant="outline"
    >
      <Chain className="mr-2 size-4" />
      {copied ? "Copied!" : "Copy Invitation Link"}
    </Button>
  );
}
