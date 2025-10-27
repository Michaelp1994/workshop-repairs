import { Card, CardContent } from "@repo/ui/card";
import { assetId, clientId } from "@repo/validators/ids.validators";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import CreateRepairForm from "../../../../components/forms/CreateRepairForm";

const createRepairPageSearchSchema = z.object({
  assetId: assetId.optional(),
  clientId: clientId.optional(),
});

export const Route = createFileRoute("/(protected)/_layout/repairs/new")({
  component: CreateRepairPage,
  validateSearch: createRepairPageSearchSchema,
});

function CreateRepairPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>New Repair</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <CreateRepairForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
