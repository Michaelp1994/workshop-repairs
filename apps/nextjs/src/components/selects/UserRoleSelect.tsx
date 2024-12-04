import type { UserRoleID } from "@repo/validators/ids.validators";

import { Combobox, type ComboboxProps } from "@repo/ui/combobox";
import { type ElementRef, forwardRef } from "react";

import { api } from "~/trpc/client";

interface UserRoleSelectProps extends Omit<ComboboxProps, "data"> {
  value: UserRoleID;
}

const UserRoleSelect = forwardRef<
  ElementRef<typeof Combobox>,
  UserRoleSelectProps
>((props, ref) => {
  const [data] = api.userRoles.getSelect.useSuspenseQuery({});

  return <Combobox data={data} ref={ref} {...props} />;
});

UserRoleSelect.displayName = "UserRoleSelect";
export default UserRoleSelect;
