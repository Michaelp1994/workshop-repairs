import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";

interface BreadcrumbSlotProps {
  params: Promise<{
    modelId: string;
  }>;
}

export default async function BreadcrumbSlot(props: BreadcrumbSlotProps) {
  const params = await props.params;
  const modelId = Number(params.modelId);
  const model = await api.models.getById({ id: modelId });
  const routes = [
    {
      label: "Models",
      href: "/models",
    },
    {
      label: model.name,
      href: `/models/${params.modelId}`,
    },
  ];
  return <Breadcrumbs routes={routes} />;
}
