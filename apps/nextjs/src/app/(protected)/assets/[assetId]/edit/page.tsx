import type { Metadata } from "next";

import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import UpdateAssetForm from "../../_components/UpdateAssetForm";

interface EditAssetPageProps {
  params: Promise<{
    assetId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Update Asset",
  description: "Create a new asset",
};

export default async function EditAssetPage(props: EditAssetPageProps) {
  const params = await props.params;
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
