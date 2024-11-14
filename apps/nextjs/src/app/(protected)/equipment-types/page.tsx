import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { CreateLink } from "~/components/ButtonLink";

import EquipmentTypeTable from "./_components/EquipmentTypeTable";

export const metadata: Metadata = {
  title: "Equipment Types",
};

export default function AllEquipmentTypesPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <CreateLink href="/equipment-types/new">
          Create Equipment Type
        </CreateLink>
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
