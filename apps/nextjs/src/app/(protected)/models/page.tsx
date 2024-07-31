import ModelsTable from "./_components/ModelsTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardWrapper,
  CardToolbar,
} from "@repo/ui/card";
import { CreateLink } from "~/app/_components/ButtonLink";

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
