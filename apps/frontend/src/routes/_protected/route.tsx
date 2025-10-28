import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { AlertCircle, ArrowLeft, RotateCcw } from "@repo/ui/icons";
import { Ghost, Home } from "@repo/ui/icons";
import { SidebarInset, SidebarProvider } from "@repo/ui/sidebar";
import { type ErrorComponentProps, Link } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import AppSidebar from "~/components/AppSideBar";
import NavBar from "~/components/NavBar";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  notFoundComponent: NotFound,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar></NavBar>
        <div className="mx-auto w-full max-w-6xl">
          <div className="h-full p-4">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function NotFound() {
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
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function Error({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid h-full w-full place-content-center">
      <Card className="max-w-md">
        <CardHeader>
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">
            Something went wrong!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          If this issue persists, please contact support with error code:{" "}
          <code className="bg-muted relative rounded-sm px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {error.name || "ERR_UNKNOWN"}
          </code>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Button onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
