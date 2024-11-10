import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardDescription></CardDescription>
        <CardTitle>Welcome to AssetRx</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          AssetRx is a platform that helps you manage your assets, repairs, and
          maintenance in one place.
        </p>
        <p>
          Get started by inviting your team members to join your organization.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="onboarding/organization">Next Step</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
