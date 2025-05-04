import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import UpdateManufacturerForm from "../../_components/UpdateManufacturerForm";

interface EditManufacturerPageProps {
  params: Promise<{
    manufacturerId: string;
  }>;
}

export default async function EditManufacturerPage(
  props: EditManufacturerPageProps,
) {
  const params = await props.params;
  const manufacturerId = Number(params.manufacturerId);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Manufacturer</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateManufacturerForm manufacturerId={manufacturerId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
