import type { UseFormReturn } from "@repo/ui/form";

import { Alert, AlertDescription, AlertTitle } from "@repo/ui/alert";
import { AlertCircle } from "@repo/ui/icons";

interface ErrorAlertProps {
  form: UseFormReturn<any, any, any>;
}

export default function ErrorAlert({ form }: ErrorAlertProps) {
  const rootError = form.formState.errors.root;
  if (!rootError) {
    return null;
  }
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{rootError.message}</AlertDescription>
    </Alert>
  );
}
