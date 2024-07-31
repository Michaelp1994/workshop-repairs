export function DetailsPage({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 pt-4">{children}</div>;
}

export function DetailsPageToolbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex items-center gap-4">{children}</div>;
}

export function DetailsPageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
      {children}
    </h1>
  );
}

export function DetailsPageGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
      {children}
    </div>
  );
}

export function DetailsPageMainColumn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      {children}
    </div>
  );
}

export function DetailsPageSecondaryColumn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
      {children}
    </div>
  );
}
