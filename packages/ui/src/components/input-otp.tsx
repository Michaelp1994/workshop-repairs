"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";

export function useOTPInput() {
  const context = React.useContext(OTPInputContext);
  if (!context) {
    throw new Error("useOTPInput must be used within a OTPInputProvider");
  }
  return context;
}

const InputOTP = ({
  ref,
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput>) => (
  <OTPInput
    className={cn("disabled:cursor-not-allowed", className)}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    ref={ref}
    {...props}
  />
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={cn("flex items-center", className)} ref={ref} {...props} />
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = ({
  ref,
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) => {
  const inputOTPContext = useOTPInput();
  const slotProps = inputOTPContext.slots[index];
  if (!slotProps) {
    throw new Error(
      `InputOTPSlot must be a child of OTPInput (index=${index})`,
    );
  }
  const { char, hasFakeCaret, isActive } = slotProps;

  return (
    <div
      className={cn(
        "border-input relative flex h-10 w-10 items-center justify-center border-y border-r text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "ring-ring ring-offset-background z-10 ring-2",
        className,
      )}
      ref={ref}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
};
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = ({ ref, ...props }: React.ComponentProps<"div">) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
