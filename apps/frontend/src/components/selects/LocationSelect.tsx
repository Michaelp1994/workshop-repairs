import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const LocationSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const [data] = api.locations.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

LocationSelect.displayName = "LocationSelect";
export default LocationSelect;
