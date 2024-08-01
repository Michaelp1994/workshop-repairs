import type { ComponentPropsWithoutRef } from "react";

export function DetailsPage(props: ComponentPropsWithoutRef<"div">) {
  return <div className="grid gap-4 pt-4" {...props} />;
}

export function DetailsPageToolbar(props: ComponentPropsWithoutRef<"div">) {
  return <div className="flex items-center gap-4" {...props} />;
}

export function DetailsPageTitle(props: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0"
      {...props}
    />
  );
}

export function DetailsPageGrid(props: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
      {...props}
    />
  );
}

export function DetailsPageMainColumn(props: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8"
      {...props}
    />
  );
}

export function DetailsPageSecondaryColumn(
  props: ComponentPropsWithoutRef<"div">,
) {
  return (
    <div className="grid auto-rows-max items-start gap-4 lg:gap-8" {...props} />
  );
}
