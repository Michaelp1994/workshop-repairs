import { Card, CardContent } from "@repo/ui/card";
import {
  clientId,
  equipmentTypeId,
  locationId,
  modelId,
} from "~/validators/ids.validators";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

import CreateAssetForm from "~/components/forms/CreateAssetForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

const createAssetPageSearchSchema = z.object({
  locationId: locationId.optional(),
  clientId: clientId.optional(),
  modelId: modelId.optional(),
  equipmentTypeId: equipmentTypeId.optional(),
});

export const Route = createFileRoute("/_protected/assets/new")({
  component: CreateAssetPage,
  validateSearch: createAssetPageSearchSchema,
});

function CreateAssetPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>New Asset</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <CreateAssetForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
