import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdateAssetForm from "../../_components/UpdateAssetForm";

interface EditAssetPageProps {
  params: {
    assetId: string;
  };
}

export default function EditAssetPage({ params }: EditAssetPageProps) {
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
