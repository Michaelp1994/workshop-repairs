import * as React from "react";

import { cn } from "../lib/utils";

const Card = ({ ref, className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "bg-card text-card-foreground rounded-lg border shadow-sm",
      className,
    )}
    ref={ref}
    {...props}
  />
);
Card.displayName = "Card";

const CardHeader = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn("flex items-center justify-between p-6", className)}
    ref={ref}
    {...props}
  />
);
CardHeader.displayName = "CardHeader";

const CardHeaderText = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn("flex flex-col gap-y-1.5", className)}
    ref={ref}
    {...props}
  />
);
CardHeaderText.displayName = "CardHeader";

const CardHeaderActions = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={cn("", className)} ref={ref} {...props} />
);
CardHeaderActions.displayName = "CardHeader";

const CardTitle = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"h3">) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    ref={ref}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"p">) => (
  <p
    className={cn("text-muted-foreground text-sm", className)}
    ref={ref}
    {...props}
  />
);
CardDescription.displayName = "CardDescription";

const CardContent = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={cn("p-6", className)} ref={ref} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn("flex items-center p-6 pt-0", className)}
    ref={ref}
    {...props}
  />
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderActions,
  CardHeaderText,
  CardTitle,
};
