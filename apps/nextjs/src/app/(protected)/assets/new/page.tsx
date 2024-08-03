import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import { BackButton } from "~/components/BackButton";
import { DetailsPage, DetailsPageToolbar } from "~/components/DetailsPage";

import CreateAssetForm from "../_components/CreateAssetForm";

export default function CreateAssetPage() {
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
      </DetailsPageToolbar>
      <Card>
        <CardHeader>
          <CardTitle>Create Asset</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateAssetForm />
        </CardContent>
      </Card>
    </DetailsPage>
  );
}
