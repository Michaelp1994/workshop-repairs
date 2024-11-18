import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

const LocationSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const { data, isLoading, isError } = api.locations.getSelect.useQuery({});

  if (isError) {
    return <div>Error</div>;
  }

  return <Combobox data={data} isLoading={isLoading} ref={ref} {...props} />;
});

LocationSelect.displayName = "LocationSelect";
export default LocationSelect;
