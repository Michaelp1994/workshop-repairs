import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";

interface BreadcrumbSlotProps {
  params: {
    partId: string;
  };
}

export default async function BreadcrumbSlot({ params }: BreadcrumbSlotProps) {
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
