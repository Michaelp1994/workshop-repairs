import { Combobox, type ComboboxProps } from "@repo/ui/combobox";;
import { type ElementRef, forwardRef } from "react";
import { api } from "~/trpc/react";

const LocationSelect = forwardRef<
  ElementRef<typeof Combobox>,
  Omit<ComboboxProps, "data">
>((props, ref) => {
  const { data, isLoading, isError } = api.locations.getSelect.useQuery({});

  if (isError) {
    return <div>Error</div>;
  }

  return <Combobox ref={ref} isLoading={isLoading} data={data} {...props} />;
});

LocationSelect.displayName = "LocationSelect";
export default LocationSelect;
