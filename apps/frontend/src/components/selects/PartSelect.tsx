import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const PartSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const [data] = api.parts.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

PartSelect.displayName = "PartSelect";
export default PartSelect;
