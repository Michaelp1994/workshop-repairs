import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { CreateLink } from "~/components/ButtonLink";

import PartsTable from "./components/PartsTable";

export default function AllPartsPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <CreateLink href="/parts/new">Create Part</CreateLink>
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
