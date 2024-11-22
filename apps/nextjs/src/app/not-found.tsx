import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Ghost, Home } from "@repo/ui/icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen w-full place-content-center p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">404 - Page Not found</CardTitle>
        </CardHeader>
        <CardContent>
          <Ghost className="text-muted-foreground mx-auto h-20 w-20" />
          <p>It seems like the page you are searching for has dissapeared!</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
