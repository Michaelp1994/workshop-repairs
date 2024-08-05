import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import ProfileForm from "./ProfileForm";

export default function ProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Enter your details below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm />
      </CardContent>
    </Card>
  );
}
