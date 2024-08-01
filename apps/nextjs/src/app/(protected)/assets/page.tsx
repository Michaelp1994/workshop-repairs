import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";
import { type InitialDataTableState } from "@repo/ui/data-table";

import { CreateLink } from "~/components/ButtonLink";

import AssetsTable from "./_components/AssetsTable";

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
      <CardToolbar>
        <CreateLink href="/assets/new">Create Asset</CreateLink>
      </CardToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Assets</CardTitle>
          <CardDescription>
            Manage the assets across all clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssetsTable initialState={initialState} />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
