import {
  Card,
  CardHeader,
  CardHeaderActions,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { IconButton } from "~/components/IconButton";
import { api } from "~/trpc/client";
import { type LocationID } from "~/validators/ids.validators";

import { columns } from "./tables/AssetsTable/columns";

interface LocationAssetsTableProps {
  locationId: LocationID;
}

export default function LocationAssetsTable({
  locationId,
}: LocationAssetsTableProps) {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      createdAt: false,
      assetNumber: false,
      updatedAt: false,
      location: false,
    },
    pagination: {
      pageSize: 5,
      pageIndex: 0,
    },
  });

  const [assets] = api.assets.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      locationId,
    },
  });

  const [rowCount] = api.assets.countAll.useSuspenseQuery({
    ...countState,
    filters: {
      locationId,
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Assets</CardTitle>
        </CardHeaderText>
        <CardHeaderActions>
          <IconButton
            linkOptions={{ to: "/assets/new", search: { locationId } }}
            size="sm"
            variant="create"
          >
            Add
          </IconButton>
        </CardHeaderActions>
      </CardHeader>
      <DataTable
        columns={columns}
        data={assets}
        rowCount={rowCount}
        {...tableState}
      />
    </Card>
  );
}
