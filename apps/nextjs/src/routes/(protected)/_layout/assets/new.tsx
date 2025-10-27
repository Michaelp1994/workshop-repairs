import { Card, CardContent } from "@repo/ui/card";
import { clientId, locationId, modelId } from "@repo/validators/ids.validators";
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
});

export const Route = createFileRoute("/(protected)/_layout/assets/new")({
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
