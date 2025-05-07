"use client"; // Error boundaries must be Client Components

import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { AlertCircle, ArrowLeft, RotateCcw } from "@repo/ui/icons";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
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
            {error?.name || "ERR_UNKNOWN"}
          </code>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/dashboard">
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
