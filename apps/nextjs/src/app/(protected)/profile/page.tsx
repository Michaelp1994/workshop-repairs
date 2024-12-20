import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import ProfileForm from "./_components/ProfileForm";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
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
