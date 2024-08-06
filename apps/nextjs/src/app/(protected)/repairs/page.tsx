import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";
import { type InitialDataTableState } from "@repo/ui/data-table";

import { CreateLink } from "~/components/ButtonLink";

import RepairsTable from "../../../components/tables/RepairsTable";

export const metadata: Metadata = {
  title: "Workshop App | Repairs",
  description: "Workshop App",
};

export default function AllRepairsPage() {
  const initialState: InitialDataTableState = {
    columnFilters: [{ id: "status", value: [1, 2, 3, 4, 5, 6] }],
    columnVisibility: {
      asset_assetNumber: false,
      createdAt: false,
      updatedAt: false,
    },
  };
  return (
    <CardWrapper>
      <CardToolbar>
        <CreateLink href="/repairs/new">Create Repair</CreateLink>
      </CardToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Repairs</CardTitle>
        </CardHeader>
        <CardContent>
          <RepairsTable initialState={initialState} />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
