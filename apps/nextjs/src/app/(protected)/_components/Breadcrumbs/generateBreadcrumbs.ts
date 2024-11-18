export default function generateBreadcrumbs(layoutSegments: string[]) {
  return layoutSegments.map((segment, index) => {
    return {
      label: segment,
      href: `/${layoutSegments.slice(0, index + 1).join("/")}`,
    };
  });
}
