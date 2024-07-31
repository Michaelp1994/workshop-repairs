import PartsTable from "./components/PartsTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardWrapper,
  CardToolbar,
} from "@repo/ui/card";
import { CreateLink } from "~/app/_components/ButtonLink";

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
