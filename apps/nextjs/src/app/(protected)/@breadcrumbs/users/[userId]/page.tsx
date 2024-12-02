import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";

interface BreadcrumbSlotProps {
  params: {
    userId: string;
  };
}

export default async function BreadcrumbSlot({ params }: BreadcrumbSlotProps) {
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
