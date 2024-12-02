import { Breadcrumbs } from "@repo/ui/breadcrumb";

import generateBreadcrumbs from "./generateBreadcrumbs";

interface BreadcrumbSlotProps {
  params: {
    catchAll: string[];
  };
}

export default function BreadcrumbSlot({ params }: BreadcrumbSlotProps) {
  const breadcrumbs = generateBreadcrumbs(params.catchAll);
  return <Breadcrumbs routes={breadcrumbs} />;
}
