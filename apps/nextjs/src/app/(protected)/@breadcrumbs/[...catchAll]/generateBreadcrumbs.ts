export default function generateBreadcrumbs(layoutSegments: string[]) {
  return layoutSegments.map((segment, index) => {
    const label = segment.replace(/-/g, " ");
    return {
      label,
      href: `/${layoutSegments.slice(0, index + 1).join("/")}`,
    };
  });
}
