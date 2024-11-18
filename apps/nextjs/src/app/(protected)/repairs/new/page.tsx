import type { Metadata } from "next";

import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import Breadcrumbs from "../../_components/Breadcrumbs";
import CreateRepairForm from "../_components/CreateRepairForm";

export const metadata: Metadata = {
  title: "Create Repair",
};

const breadcrumbs = [
  { label: "Repairs", href: "/repairs" },
  { label: "Create", href: "/repairs/new" },
];

export default function CreateRepairPage() {
  return (
    <PageWrapper>
      <Breadcrumbs routes={breadcrumbs} />
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
