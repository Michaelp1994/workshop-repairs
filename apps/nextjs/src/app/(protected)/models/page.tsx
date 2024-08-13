import type { InitialDataTableState } from "@repo/ui/data-table";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { CreateLink } from "~/components/ButtonLink";

import ModelsTable from "../../../components/tables/ModelsTable";

export default function AllModelsPage() {
  const initialState: InitialDataTableState = {
    columnVisibility: {
      createdAt: false,
      updatedAt: false,
    },
  };

  return (
    <CardWrapper>
      <CardToolbar>
        <CreateLink href="/models/new">Create Model</CreateLink>
      </CardToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Models</CardTitle>
        </CardHeader>
        <CardContent>
          <ModelsTable initialState={initialState} />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
