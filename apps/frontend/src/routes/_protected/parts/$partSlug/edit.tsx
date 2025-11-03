import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdatePartForm from "~/components/forms/UpdatePartForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/_protected/parts/$partSlug/edit")({
  component: EditPartPage,
});

function EditPartPage() {
  const { partSlug } = Route.useParams();

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Part</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdatePartForm slug={partSlug} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
