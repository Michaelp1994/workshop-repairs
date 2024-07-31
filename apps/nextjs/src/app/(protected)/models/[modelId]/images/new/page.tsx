import type { ModelID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import { BackButton } from "~/app/_components/BackButton";
import {
  DetailsPage,
  DetailsPageTitle,
  DetailsPageToolbar,
} from "~/app/_components/DetailsPage";

import CreateModelImageForm from "./CreateModelImageForm";

interface CreateModelImagePageProps {
  params: {
    modelId: ModelID;
  };
}

export default function CreateModelImagePage({
  params,
}: CreateModelImagePageProps) {
  const modelId = Number(params.modelId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Model Image</CardTitle>
        <CardDescription>Add an image to model {modelId}</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateModelImageForm modelId={modelId} />
      </CardContent>
    </Card>
  );
}
