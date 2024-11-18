import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardWrapper,
} from "@repo/ui/card";
import { type InitialDataTableState } from "@repo/ui/data-table";

import { CreateLink } from "~/components/ButtonLink";

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
            <CreateLink href="/assets/new">Create Asset</CreateLink>
          </div>
        </CardHeader>
        <CardContent>
          <AssetsTable initialState={initialState} />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
