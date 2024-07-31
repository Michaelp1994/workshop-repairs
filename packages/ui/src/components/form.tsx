"use client";

import * as React from "react";
import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useForm as _useForm,
  type UseFormProps as _UseFormProps,
  UseFormReturn,
  SubmitHandler,
  SubmitErrorHandler,
  Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AnyZodObject, ZodSchema } from "zod";

import { cn } from "../lib/utils";
import { Label } from "./label";

const Form = FormProvider;

// interface FormProps<
//   TFieldValues extends FieldValues = FieldValues,
//   TContext = any,
//   TTransformedValues extends FieldValues | undefined = undefined,
// > {
//   children: React.ReactNode;
//   form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
//   onValid: SubmitHandler<TFieldValues>;
//   onInvalid: SubmitErrorHandler<TFieldValues>;
// }

// function FormFn<
//   TFieldValues extends FieldValues = FieldValues,
//   TContext = any,
//   TTransformedValues extends FieldValues | undefined = undefined,
// >(
//   {
//     children,
//     onValid,
//     onInvalid,
//     form,
//   }: FormProps<TFieldValues, TContext, TTransformedValues>,
//   ref: React.ForwardedRef<HTMLFormElement>,
// ) {
//   return (
//     <FormProvider {...form}>
//       <form
//         onSubmit={(e) => void form.handleSubmit(onValid, onInvalid)(e)}
//         onReset={() => {
//           form.reset();
//         }}
//         ref={ref}
//       >
//         {children}
//       </form>
//     </FormProvider>
//   );
// }

// const Form = React.forwardRef(FormFn);

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-destructive text-sm font-medium", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

const FormFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mt-4 flex justify-end gap-2", className)}
      {...props}
    />
  );
});
FormFooter.displayName = "FormFooter";

interface UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> extends Omit<_UseFormProps<TFieldValues, TContext>, "resolver"> {
  schema: ZodSchema<TFieldValues>;
  values: NoInfer<TFieldValues>;
}

function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({ schema, ...props }: UseFormProps<TFieldValues, TContext>) {
  return _useForm({
    ...props,
    resolver: zodResolver(schema),
  });
}

export {
  useForm,
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormFooter,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
