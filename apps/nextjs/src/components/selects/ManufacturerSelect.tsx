import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const ManufacturerSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const [data] = api.manufacturers.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

ManufacturerSelect.displayName = "ManufacturerSelect";
export default ManufacturerSelect;
