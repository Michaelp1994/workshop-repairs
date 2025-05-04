import { Breadcrumbs } from "@repo/ui/breadcrumb";

import generateBreadcrumbs from "./generateBreadcrumbs";

interface BreadcrumbSlotProps {
  params: Promise<{
    catchAll: string[];
  }>;
}

export default async function BreadcrumbSlot(props: BreadcrumbSlotProps) {
  const params = await props.params;
  const breadcrumbs = generateBreadcrumbs(params.catchAll);
  return <Breadcrumbs routes={breadcrumbs} />;
}
