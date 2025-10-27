import type { UserTypeID } from "@repo/validators/ids.validators";

import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

interface UserTypeSelectProps extends Omit<ComboboxProps, "data"> {
  value: UserTypeID;
}

const UserTypeSelect = forwardRef<
  ElementRef<typeof Combobox>,
  UserTypeSelectProps
>((props, ref) => {
  const [data] = api.userTypes.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

UserTypeSelect.displayName = "UserTypeSelect";
export default UserTypeSelect;
