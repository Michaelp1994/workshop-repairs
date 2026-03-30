import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdateManufacturerForm from "~/components/forms/UpdateManufacturerForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute(
  "/_protected/manufacturers/$manufacturerId/edit",
)({
  component: EditManufacturerPage,
});

function EditManufacturerPage() {
  const { manufacturerId } = Route.useParams();

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Manufacturer</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateManufacturerForm manufacturerId={manufacturerId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
