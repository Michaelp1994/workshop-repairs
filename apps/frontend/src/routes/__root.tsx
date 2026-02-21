import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Ghost, Home } from "@repo/ui/icons";
import { Toaster } from "@repo/ui/sonner";
import {
  createRootRoute,
  type ErrorComponentProps,
  Outlet,
} from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { TRPCProvider } from "~/trpc/client";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: GlobalError,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <TRPCProvider>
      <NiceModal.Provider>
        <TanStackRouterDevtools />
        <Outlet />
        <Toaster closeButton richColors />
      </NiceModal.Provider>
    </TRPCProvider>
  );
}

function GlobalError({ reset, error }: ErrorComponentProps) {
  console.log(error);
  return (
    <html>
      <body>
        <h2>Something went wrong (Global)!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
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
