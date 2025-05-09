import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import CreateModelForm from "../_components/CreateModelForm";

export default function CreateModelPage() {
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
