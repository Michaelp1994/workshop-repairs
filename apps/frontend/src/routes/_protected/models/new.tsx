import { Card, CardContent } from "@repo/ui/card";
import { equipmentTypeId, manufacturerId } from "~/validators/ids.validators";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

import CreateModelForm from "~/components/forms/CreateModelForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

const createModelPageSearchSchema = z.object({
  manufacturerId: manufacturerId.optional(),
  equipmentTypeId: equipmentTypeId.optional(),
});

export const Route = createFileRoute("/_protected/models/new")({
  component: CreateModelPage,
  validateSearch: createModelPageSearchSchema,
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
