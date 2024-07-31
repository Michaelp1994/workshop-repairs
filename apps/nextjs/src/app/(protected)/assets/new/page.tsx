import { BackButton } from "~/app/_components/BackButton";
import { DetailsPage, DetailsPageToolbar } from "~/app/_components/DetailsPage";
import CreateAssetForm from "./CreateAssetForm";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

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
