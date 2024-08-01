import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { CreateLink } from "~/components/ButtonLink";

import ClientsTable from "./_components/ClientsTable";

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
