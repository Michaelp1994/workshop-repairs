import { Toaster } from "@repo/ui/sonner";
import { cn } from "@repo/ui/utils";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import NavBar from "~/components/NavBar";
import NextBreadcrumb from "~/components/NextBreadcrumb";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/client";

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
  title: "AssetRx",
  description: "Workshop App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={cn(
        "h-100 scroll-smooth antialiased",
        fontHeading.variable,
        fontBody.variable,
      )}
      lang="en"
    >
      <TRPCReactProvider>
        <body className="h-100 bg-muted/40 w-screen">
          <div className="grid h-full grid-rows-[auto_1fr]">
            <NavBar />
            <div className="p-4">
              <NextBreadcrumb />
              <main className="center mx-auto max-w-7xl">
                <Suspense>{children}</Suspense>
              </main>
            </div>
          </div>
          <Toaster closeButton richColors />
        </body>
      </TRPCReactProvider>
    </html>
  );
}
