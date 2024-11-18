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

import EquipmentTypeTable from "./_components/EquipmentTypeTable";

export const metadata: Metadata = {
  title: "Equipment Types",
};

export default function AllEquipmentTypesPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <IconButton variant="create" href="/equipment-types/new">
          Create Equipment Type
        </IconButton>
      </CardToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Equipment Types</CardTitle>
        </CardHeader>
        <CardContent>
          <EquipmentTypeTable />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
