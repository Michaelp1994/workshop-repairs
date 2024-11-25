import type { UseFormReturn } from "@repo/ui/form";
import type { FieldValues } from "react-hook-form";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

interface ErrorAlertProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined,
> {
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
}

export function ErrorAlert<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined,
>({ form }: ErrorAlertProps<TFieldValues, TContext, TTransformedValues>) {
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
