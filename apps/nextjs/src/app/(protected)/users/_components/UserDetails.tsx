"use client";
import type { UserID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/app/(protected)/_components/MetadataFields";
import { api } from "~/trpc/client";

interface UserDetailsProps {
  userId: UserID;
}

export default function UserDetails({ userId }: UserDetailsProps) {
  const [user] = api.users.getById.useSuspenseQuery({ id: userId });
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>First Name:</DetailsLabel>
          <DetailsValue>{user.firstName}</DetailsValue>
          <DetailsLabel>Last Name:</DetailsLabel>
          <DetailsValue>{user.lastName}</DetailsValue>
          <DetailsLabel>Email:</DetailsLabel>
          <DetailsValue>{user.email}</DetailsValue>
          <DetailsLabel>Type:</DetailsLabel>
          <DetailsValue>{user.type.name}</DetailsValue>
          <MetadataFields metadata={user} />
        </DetailsList>
      </CardContent>
    </Card>
  );
}
