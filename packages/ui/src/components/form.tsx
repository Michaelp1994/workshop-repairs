"use client";

import type * as LabelPrimitive from "@radix-ui/react-label";
import type { StandardSchemaV1 } from "@standard-schema/spec";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Slot } from "@radix-ui/react-slot";
import { LoaderCircle } from "lucide-react";
import * as React from "react";
import {
  useForm as _useForm,
  type UseFormProps as _UseFormProps,
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "../lib/utils";
import { Button } from "./button";
import { Label } from "./label";
export { type Path, type UseFormReturn } from "react-hook-form";
export { useFormContext } from "react-hook-form";
const Form = FormProvider;

interface UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = FieldValues,
> extends Omit<
    _UseFormProps<TFieldValues, TContext, TTransformedValues>,
    "resolver"
  > {
  schema: StandardSchemaV1<TFieldValues, TTransformedValues>;
  values?: NoInfer<TFieldValues>;
}

function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = FieldValues,
>({
  schema,
  ...props
}: UseFormProps<TFieldValues, TContext, TTransformedValues>) {
  return _useForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    resolver: standardSchemaResolver<
      TFieldValues,
      TContext,
      TTransformedValues
    >(schema),
  });
}

// const useForm = ({ schema, ...props }: UseFormProps) =>
//   _useForm({ ...props, resolver: standardSchemaResolver(schema) });

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

const FormItem = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref: React.RefObject<HTMLDivElement>;
}) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} ref={ref} {...props} />
    </FormItemContext.Provider>
  );
};
FormItem.displayName = "FormItem";

const FormLabel = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
  ref: React.RefObject<React.ComponentRef<typeof LabelPrimitive.Root>>;
}) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      ref={ref}
      {...props}
    />
  );
};
FormLabel.displayName = "FormLabel";

const FormControl = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof Slot> & {
  ref: React.RefObject<React.ComponentRef<typeof Slot>>;
}) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      id={formItemId}
      ref={ref}
      {...props}
    />
  );
};
FormControl.displayName = "FormControl";

const FormDescription = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ref: React.RefObject<HTMLParagraphElement>;
}) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className={cn("text-muted-foreground text-sm", className)}
      id={formDescriptionId}
      ref={ref}
      {...props}
    />
  );
};
FormDescription.displayName = "FormDescription";

const FormMessage = ({
  ref,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ref: React.RefObject<HTMLParagraphElement>;
}) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      className={cn("text-destructive text-sm font-medium", className)}
      id={formMessageId}
      ref={ref}
      {...props}
    >
      {body}
    </p>
  );
};
FormMessage.displayName = "FormMessage";

const FormFooter = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      className={cn("mt-4 flex justify-end gap-2", className)}
      ref={ref}
      {...props}
    />
  );
};
FormFooter.displayName = "FormFooter";

interface SubmitButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  isLoading?: boolean;
}

const SubmitButton = ({
  ref,
  isLoading,
  children,
  ...buttonProps
}: SubmitButtonProps & {
  ref: React.RefObject<HTMLButtonElement>;
}) => (
  <Button disabled={isLoading} ref={ref} type="submit" {...buttonProps}>
    {isLoading ? (
      <LoaderCircle className="animate-spin" />
    ) : children ? (
      children
    ) : (
      "Submit"
    )}
  </Button>
);

SubmitButton.displayName = "SubmitButton";

const ResetButton = ({
  ref,
  ...props
}: Omit<React.HTMLAttributes<HTMLButtonElement>, "type" | "children"> & {
  ref: React.RefObject<HTMLButtonElement>;
}) => (
  <Button ref={ref} type="reset" variant="ghost" {...props}>
    Reset
  </Button>
);

ResetButton.displayName = "ResetButton";

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  ResetButton,
  SubmitButton,
  useForm,
  useFormField,
};
