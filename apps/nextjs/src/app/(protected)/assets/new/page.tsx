import type { Metadata } from "next";

import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import CreateAssetForm from "../_components/CreateAssetForm";

export const metadata: Metadata = {
  title: "New Asset",
  description: "Create a new asset",
};

export default function CreateAssetPage() {
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
