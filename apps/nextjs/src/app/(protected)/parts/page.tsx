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

import PartsTable from "../../../components/tables/PartsTable";

export const metadata: Metadata = {
  title: "Parts",
};

export default function AllPartsPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <IconButton variant="create" href="/parts/new">
          Create Part
        </IconButton>
      </CardToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Parts</CardTitle>
        </CardHeader>
        <CardContent>
          <PartsTable />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
