import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import ProfileForm from "~/components/forms/ProfileForm";

export const Route = createFileRoute("/_protected/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your account settings and set e-mail preferences.
          </CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <ProfileForm />
      </CardContent>
    </Card>
  );
}
