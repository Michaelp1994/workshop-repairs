import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";
import generateRepairSlug from "~/utils/generateRepairSlug";

interface BreadcrumbSlotProps {
  params: Promise<{
    repairId: string;
  }>;
}

export default async function BreadcrumbSlot(props: BreadcrumbSlotProps) {
  const params = await props.params;
  const repairId = Number(params.repairId);
  const repair = await api.repairs.getById({ id: repairId });
  const routes = [
    {
      label: "Repairs",
      href: "/repairs",
    },
    {
      label: generateRepairSlug(repair.id),
      href: `/repairs/${params.repairId}`,
    },
  ];
  return <Breadcrumbs routes={routes} />;
}
