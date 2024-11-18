export default function generateBreadcrumbs(layoutSegments: string[]) {
  console.log(layoutSegments);
  return layoutSegments.map((segment, index) => {
    return {
      label: segment,
      href: `/${layoutSegments.slice(0, index + 1).join("/")}`,
    };
  });
}
