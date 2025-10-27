import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import CreateModelForm from "~/components/forms/CreateModelForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/(protected)/_layout/models/new")({
  component: CreateModelPage,
});

function CreateModelPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>New Model</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <CreateModelForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
