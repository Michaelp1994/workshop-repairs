import { CreateLink } from "~/app/_components/ButtonLink";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";
import RepairTypesTable from "./components/RepairTypesTable";

export default function AllRepairTypesPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <CreateLink href="/assets/new">Create Asset</CreateLink>
      </CardToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Repair Types</CardTitle>
        </CardHeader>
        <CardContent>
          <RepairTypesTable />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
