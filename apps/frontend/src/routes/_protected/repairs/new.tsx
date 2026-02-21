import { Card, CardContent } from "@repo/ui/card";
import { assetId, clientId } from "@repo/validators/ids.validators";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import CreateRepairForm from "~/components/forms/CreateRepairForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

const createRepairPageSearchSchema = z.object({
  assetId: assetId.optional(),
  clientId: clientId.optional(),
});

export const Route = createFileRoute("/_protected/repairs/new")({
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
