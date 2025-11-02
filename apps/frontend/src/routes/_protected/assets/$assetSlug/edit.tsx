import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdateAssetForm from "~/components/forms/UpdateAssetForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/_protected/assets/$assetSlug/edit")({
  component: EditAssetPage,
});

function EditAssetPage() {
  const params = Route.useParams();
  const assetId = Number(params.assetId);
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Asset</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateAssetForm assetId={assetId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
