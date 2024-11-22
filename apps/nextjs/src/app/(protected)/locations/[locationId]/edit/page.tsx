import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import UpdateLocationForm from "../../_components/UpdateLocationForm";

interface EditLocationPageProps {
  params: {
    locationId: string;
  };
}

export default function EditLocationPage({ params }: EditLocationPageProps) {
  const locationId = Number(params.locationId);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Location</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateLocationForm locationId={locationId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
