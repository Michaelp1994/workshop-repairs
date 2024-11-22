import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdateManufacturerForm from "../../_components/UpdateManufacturerForm";

interface EditManufacturerPageProps {
  params: {
    manufacturerId: string;
  };
}

export default function EditManufacturerPage({
  params,
}: EditManufacturerPageProps) {
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
