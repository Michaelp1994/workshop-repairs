import type React from "react";

import { Alert, AlertDescription, AlertTitle } from "@repo/ui/alert";
import { AlertCircle } from "@repo/ui/icons";

interface ErrorAlertProps {
  children: React.ReactNode;
}

export default function ErrorAlert({ children }: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
