import type { ComponentPropsWithoutRef } from "react";

import { Upload } from "@repo/ui/icons";

export function ImageGrid(props: ComponentPropsWithoutRef<"div">) {
  return <div className="grid grid-cols-3 gap-2" {...props} />;
}

export function ImageGridItem(props: ComponentPropsWithoutRef<"img">) {
  return (
    <img className="aspect-square w-full rounded-md object-cover" {...props} />
  );
}

export function ImageGridUploadButton(props: ComponentPropsWithoutRef<"div">) {
  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
      <Upload className="text-muted-foreground h-1/5 w-1/5" />
      <span className="sr-only">Upload</span>
    </div>
  );
}
