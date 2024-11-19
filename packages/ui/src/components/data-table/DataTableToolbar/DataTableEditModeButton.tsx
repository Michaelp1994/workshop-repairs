"use client";
import { useState } from "react";

import { Toggle } from "../../toggle";

export default function DataTableEditModeButton() {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle
      onPressedChange={(pressed) => {
        setChecked(pressed);
      }}
      pressed={checked}
    >
      Edit Mode
    </Toggle>
  );
}
