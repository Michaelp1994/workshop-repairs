import ClientsTable from "./_components/ClientsTable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";
import { CreateLink } from "~/app/_components/ButtonLink";

export default function AllClientsPage() {
  return (
    <CardWrapper>
      <CardToolbar>
        <CreateLink href="/clients/new">Create Client</CreateLink>
      </CardToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientsTable />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
