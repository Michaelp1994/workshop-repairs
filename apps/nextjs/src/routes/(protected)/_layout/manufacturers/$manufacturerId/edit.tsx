import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdateManufacturerForm from "../../../../../components/forms/UpdateManufacturerForm";
export const Route = createFileRoute(
  "/(protected)/_layout/manufacturers/$manufacturerId/edit",
)({
  component: EditManufacturerPage,
});

function EditManufacturerPage() {
  const params = Route.useParams();
  const manufacturerId = Number(params.manufacturerId);

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
