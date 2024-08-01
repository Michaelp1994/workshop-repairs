import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import { BackButton } from "~/components/BackButton";
import { DetailsPage, DetailsPageToolbar } from "~/components/DetailsPage";

import CreateAssetForm from "./CreateAssetForm";

export default function CreateAssetPage() {
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        {/* <DetailsPageTitle>Create Asset</DetailsPageTitle>    */}
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
