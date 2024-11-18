interface GenericComponentProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: GenericComponentProps) {
  return <div className="space-y-4">{children}</div>;
}

export function PageTitle({ children }: GenericComponentProps) {
  return <h1 className="text-3xl font-bold tracking-tight">{children}</h1>;
}
export function PageDescription({ children }: GenericComponentProps) {
  return <h1 className="text-muted-foreground">{children}</h1>;
}

export function PageHeader({ children }: GenericComponentProps) {
  return <div className="flex items-center justify-between">{children}</div>;
}

export function PageHeaderText({ children }: GenericComponentProps) {
  return <div>{children}</div>;
}

export function PageHeaderActions({ children }: GenericComponentProps) {
  return <div>{children}</div>;
}
