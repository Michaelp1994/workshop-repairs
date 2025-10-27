import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import CreateManufacturerForm from "~/components/forms/CreateManufacturerForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/(protected)/_layout/manufacturers/new")({
  component: CreateManufacturerPage,
});

function CreateManufacturerPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>New Manufacturer</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <CreateManufacturerForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
