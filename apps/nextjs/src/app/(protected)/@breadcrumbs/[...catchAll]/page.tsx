import Breadcrumbs from "../../_components/Breadcrumbs";

interface Props {
  params: {
    catchAll: string[];
  };
}
export default function BreadcrumbsSlot({ params: { catchAll } }: Props) {
  const routes = catchAll.map((route) => ({
    href: `/${route}`,
    label: route,
  }));
  return <Breadcrumbs routes={routes} />;
}
