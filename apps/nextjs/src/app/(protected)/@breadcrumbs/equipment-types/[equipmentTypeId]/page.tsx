import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";

interface BreadcrumbSlotProps {
  params: {
    equipmentTypeId: string;
  };
}

export default async function BreadcrumbSlot({ params }: BreadcrumbSlotProps) {
  const equipmentTypeId = Number(params.equipmentTypeId);
  const equipmentType = await api.equipmentTypes.getById({
    id: equipmentTypeId,
  });
  const routes = [
    {
      label: "Equipment Types",
      href: "/equipment-types",
    },
    {
      label: equipmentType.name,
      href: `/equipmentTypes/${params.equipmentTypeId}`,
    },
  ];
  return <Breadcrumbs routes={routes} />;
}
