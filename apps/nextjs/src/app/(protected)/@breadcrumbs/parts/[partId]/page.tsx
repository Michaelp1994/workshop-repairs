import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";

interface BreadcrumbSlotProps {
  params: Promise<{
    partId: string;
  }>;
}

export default async function BreadcrumbSlot(props: BreadcrumbSlotProps) {
  const params = await props.params;
  const partId = Number(params.partId);
  const part = await api.parts.getById({ id: partId });
  const routes = [
    {
      label: "Parts",
      href: "/parts",
    },
    {
      label: part.name,
      href: `/parts/${params.partId}`,
    },
  ];
  return <Breadcrumbs routes={routes} />;
}
