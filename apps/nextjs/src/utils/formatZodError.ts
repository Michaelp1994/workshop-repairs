import type { AppRouter } from "@repo/api/router";
import type { Path, UseFormReturn } from "@repo/ui/form";
import type { TRPCClientErrorLike } from "@trpc/client";

import { toast } from "@repo/ui/sonner";

export default function formatZodError<
  FieldValues extends Record<string, unknown>,
>(error: TRPCClientErrorLike<AppRouter>, form: UseFormReturn<FieldValues>) {
  if (error.data?.zodError) {
    const zodError = error.data.zodError;
    Object.keys(zodError.fieldErrors).forEach((field) => {
      const message = zodError.fieldErrors[field];
      if (!message) {
        return;
      }
      form.setError(field as `root.${string}` | "root" | Path<FieldValues>, {
        message: message.join(),
      });
    });
    zodError.formErrors.forEach((error) => {
      toast.error(error);
    });
  } else {
    toast.error("Internal Server Error. Please try again later.");
  }
}
