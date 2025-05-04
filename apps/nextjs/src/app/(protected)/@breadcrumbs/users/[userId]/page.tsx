import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";

interface BreadcrumbSlotProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function BreadcrumbSlot(props: BreadcrumbSlotProps) {
  const params = await props.params;
  const userId = Number(params.userId);
  const user = await api.users.getById({ id: userId });
  const routes = [
    {
      label: "Users",
      href: "/users",
    },
    {
      label: `${user.firstName} ${user.lastName}`,
      href: `/users/${params.userId}`,
    },
  ];
  return <Breadcrumbs routes={routes} />;
}
