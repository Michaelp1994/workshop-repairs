import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";

interface BreadcrumbSlotProps {
  params: Promise<{
    locationId: string;
  }>;
}

export default async function BreadcrumbSlot(props: BreadcrumbSlotProps) {
  const params = await props.params;
  const locationId = Number(params.locationId);
  const location = await api.locations.getById({ id: locationId });
  const routes = [
    {
      label: "Locations",
      href: "/locations",
    },
    {
      label: location.name,
      href: `/locations/${params.locationId}`,
    },
  ];
  return <Breadcrumbs routes={routes} />;
}
