import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";

interface BreadcrumbSlotProps {
  params: {
    manufacturerId: string;
  };
}

export default async function BreadcrumbSlot({ params }: BreadcrumbSlotProps) {
  const manufacturerId = Number(params.manufacturerId);
  const manufacturer = await api.manufacturers.getById({ id: manufacturerId });
  const routes = [
    {
      label: "Manufacturers",
      href: "/manufacturers",
    },
    {
      label: manufacturer.name,
      href: `/manufacturers/${params.manufacturerId}`,
    },
  ];
  return <Breadcrumbs routes={routes} />;
}
