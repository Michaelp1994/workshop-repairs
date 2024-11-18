import type { InitialDataTableState } from "@repo/ui/data-table";
import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { IconButton } from "~/components/IconButton";

import ModelsTable from "../../../components/tables/ModelsTable";

export const metadata: Metadata = {
  title: "Models",
};

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
        <IconButton variant="create" href="/models/new">
          Create Model
        </IconButton>
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
