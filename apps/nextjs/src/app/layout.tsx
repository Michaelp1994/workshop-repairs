import { Toaster } from "@repo/ui/sonner";

import "~/styles/globals.css";

import { cn } from "@repo/ui/utils";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { ErrorBoundary } from "~/components/ErrorBoundary";
import { ClientTelemetry } from "~/telemetry/ClientTelemetry";
import { TRPCProvider } from "~/trpc/client";

import { SessionProvider } from "../auth/SessionProvider";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    template: "%s | AssetRx",
    default: "AssetRx",
  },
  description: "AssetRx",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const userId = cookies().get("userId")?.value;
  return (
    <ErrorBoundary>
      <ClientTelemetry />
      <html
        className={cn(
          "min-h-screen scroll-smooth antialiased",
          fontHeading.variable,
          fontBody.variable,
        )}
        lang="en"
      >
        <SessionProvider session={{ userId: Number(userId) }}>
          <TRPCProvider>
            <body className="min-h-screen">
              {children}
              <Toaster closeButton richColors />
            </body>
          </TRPCProvider>
        </SessionProvider>
      </html>
    </ErrorBoundary>
  );
}
