import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";

interface BreadcrumbSlotProps {
  params: Promise<{
    equipmentTypeId: string;
  }>;
}

export default async function BreadcrumbSlot(props: BreadcrumbSlotProps) {
  const params = await props.params;
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
