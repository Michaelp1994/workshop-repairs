import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  CardWrapper,
} from "@repo/ui/card";

import { CreateLink } from "~/components/ButtonLink";

import ModelsTable from "./_components/ModelsTable";

export default function AllModelsPage() {
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
          <ModelsTable />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
