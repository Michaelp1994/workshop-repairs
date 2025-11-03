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
  "/_protected/manufacturers/$manufacturerSlug/edit",
)({
  component: EditManufacturerPage,
});

function EditManufacturerPage() {
  const { manufacturerSlug } = Route.useParams();

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Manufacturer</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateManufacturerForm slug={manufacturerSlug} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
