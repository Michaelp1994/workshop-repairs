import type { AppRouter } from "@repo/api/router";
import type { Path, UseFormReturn } from "@repo/ui/form";
import type { TRPCClientErrorLike } from "@trpc/client";

import { toast } from "@repo/ui/sonner";

export default function displayMutationErrors<
  FieldValues extends Record<string, unknown>,
>(errors: TRPCClientErrorLike<AppRouter>, form?: UseFormReturn<FieldValues>) {
  if (errors.data?.zodError) {
    const zodError = errors.data.zodError;
    Object.keys(zodError.fieldErrors).forEach((field) => {
      const message = zodError.fieldErrors[field];
      if (!message) {
        return;
      }
      if (!form) {
        throw Error("Form is required to display form errors");
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
