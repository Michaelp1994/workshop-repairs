import type { RouterOutputs } from "@repo/api/router";

import {
  CustomCombobox,
  type CustomComboboxProps,
} from "@repo/ui/custom-combobox";
import { CheckIcon } from "@repo/ui/icons";
import { type ElementRef, forwardRef, useState } from "react";

import { api } from "~/trpc/client";

const AssetSelect = forwardRef<
  ElementRef<typeof CustomCombobox>,
  Omit<
    CustomComboboxProps,
    "data" | "fetchNextPage" | "isFetchingNextPage" | "isLoading"
  >
>((props, ref) => {
  const [filter, setFilter] = useState("");
  const [data] = api.assets.getSimpleSelect.useSuspenseQuery({
    globalFilter: filter,
  });

  return (
    <CustomCombobox
      {...props}
      data={data}
      Item={AssetItem}
      ref={ref}
      SelectedItem={SelectedAssetItem}
    />
  );
});

function AssetItem({
  option,
  isSelected,
}: {
  option: RouterOutputs["assets"]["getSimpleSelect"][number];
  isSelected: boolean;
}) {
  return (
    <>
      {isSelected && <CheckIcon className="h-5 w-5" />}
      <img
        alt={option.model.name}
        className="h-10 w-10 rounded-full object-contain"
        src={option.model.imageUrl}
      />
      <div className="ml-3 flex-shrink">
        <div className="text-lg font-semibold">{option.serialNumber}</div>
        <div className="text-muted-foreground text-sm">{option.model.name}</div>
        <div>{option.manufacturer.name}</div>
      </div>
    </>
  );
}

function SelectedAssetItem({
  option,
}: {
  option: RouterOutputs["assets"]["getSimpleSelect"][number];
}) {
  return (
    <div className="flex gap-4">
      <img
        alt={option.model.name}
        className="h-16 rounded-full object-contain"
        src={option.model.imageUrl}
      />
      <div className="flex flex-col justify-start text-start">
        <div className="text-lg font-semibold">SN: {option.serialNumber}</div>
        <div className="text-muted-foreground text-sm">{option.model.name}</div>
      </div>
    </div>
  );
}

AssetSelect.displayName = "AssetSelect";

export default AssetSelect;
