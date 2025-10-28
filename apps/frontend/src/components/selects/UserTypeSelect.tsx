import { Combobox, type ComboboxProps } from "@repo/ui/combobox";

import { api } from "~/trpc/client";

export default function UserTypeSelect(props: Omit<ComboboxProps, "data">) {
  const [data] = api.userTypes.getSelect.useSuspenseQuery({});
  return <Combobox data={data} {...props} />;
}
