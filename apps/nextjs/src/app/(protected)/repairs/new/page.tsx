import type { Metadata } from "next";

import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import CreateRepairForm from "../_components/CreateRepairForm";

export const metadata: Metadata = {
  title: "Create Repair",
};

export default function CreateRepairPage() {
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
