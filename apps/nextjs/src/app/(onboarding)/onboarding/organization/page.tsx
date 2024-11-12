import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { UserPlus, Users } from "@repo/ui/icons";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Join or Create Organization</CardTitle>
        <CardDescription>
          Choose whether you want to join an existing organization or create a
          new one.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          asChild
          className="h-auto w-full justify-start py-4 text-left"
          variant="outline"
        >
          <Link href="/onboarding/organization/join">
            <Users className="mr-2 h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">
                Join an existing organization
              </span>
              <span className="text-muted-foreground text-sm">
                You&apos;ll be added to an existing team
              </span>
            </div>
          </Link>
        </Button>
        <Button
          asChild
          className="h-auto w-full justify-start py-4 text-left"
          variant="outline"
        >
          <Link href="/onboarding/organization/create">
            <UserPlus className="mr-2 h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">Create a new organization</span>
              <span className="text-muted-foreground text-sm">
                Start fresh with a new team
              </span>
            </div>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
