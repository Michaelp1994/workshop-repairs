import type { UseFormReturn } from "@repo/ui/form";
import type { TRPCClientErrorLike } from "@trpc/client";

import { toast } from "@repo/ui/sonner";

import type { AppRouter } from "../../../backend/src/router";

export default function displayMutationErrors<
  FieldValues extends Record<string, unknown>,
>(errors: TRPCClientErrorLike<AppRouter>, _form?: UseFormReturn<FieldValues>) {
  if (errors.data?.zodError) {
    const zodError = errors.data.zodError;
    // Object.keys(zodError.fieldErrors).forEach((field) => {
    //   // const message = zodError.fieldErrors.;
    //   if (!message) {
    //     return;
    //   }
    //   if (!form) {
    //     throw Error("Form is required to display form errors");
    //   }
    //   form.setError(field as `root.${string}` | "root" | Path<FieldValues>, {
    //     message: message.join(),
    //   });
    // });
    zodError.formErrors.forEach((error) => {
      toast.error(error);
    });
  } else {
    toast.error("Internal Server Error. Please try again later.");
  }
}
