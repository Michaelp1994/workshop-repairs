import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardWrapper,
} from "@repo/ui/card";
import { type InitialDataTableState } from "@repo/ui/data-table";

import { IconButton } from "~/components/IconButton";

import AssetsTable from "../../../components/tables/AssetsTable";

export const metadata: Metadata = {
  title: "Assets",
};

export default function AllAssetsPage() {
  const initialState: InitialDataTableState = {
    columnVisibility: {
      assetNumber: false,
      createdAt: false,
      updatedAt: false,
    },
  };
  return (
    <CardWrapper>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Assets</CardTitle>
          </div>
          <div>
            <IconButton href="/assets/new" variant="create">
              Create Asset
            </IconButton>
          </div>
        </CardHeader>
        <CardContent>
          <AssetsTable initialState={initialState} />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
