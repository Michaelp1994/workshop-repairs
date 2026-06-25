import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";
import { type ModelID } from "~/validators/ids.validators";

import { api } from "~/trpc/client";

import CreateModelPartModal from "../modals/CreateModelPartModal";
import { columns } from "./columns";

interface ModelPartsTableProps {
  modelId: ModelID;
}

export default function ModelPartsTable({ modelId }: ModelPartsTableProps) {
  const { dataState, countState, tableState } = useDataTableState({
    pagination: {
      pageSize: 5,
      pageIndex: 0,
    },
  });

  const [parts] = api.partsToModels.getAllPartsByModelId.useSuspenseQuery({
    ...dataState,
    filters: {
      modelId,
    },
  });

  const [rowCount] = api.partsToModels.countAllPartsByModelId.useSuspenseQuery({
    ...countState,
    filters: {
      modelId,
    },
  });

  async function showCreateModal() {
    await NiceModal.show(CreateModelPartModal, { modelId });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Parts</CardTitle>
        <Button onClick={showCreateModal}>Add Part</Button>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={parts}
          getRowId={(row) => row.partId.toString()}
          rowCount={rowCount}
          {...tableState}
        />
      </CardContent>
    </Card>
  );
}
