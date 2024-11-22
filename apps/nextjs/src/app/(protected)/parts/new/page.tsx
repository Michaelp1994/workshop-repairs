import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import CreatePartForm from "../_components/CreatePartForm";

export default function CreatePartPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>New Part</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <CreatePartForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
