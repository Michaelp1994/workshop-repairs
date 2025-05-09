import { Toaster } from "@repo/ui/sonner";
import "@repo/ui/globals.css";
import { cn } from "@repo/ui/utils";
import { type Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
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
  const userId = (await cookies()).get("userId")?.value;
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
        suppressHydrationWarning
      >
        <SessionProvider session={{ userId: Number(userId) }}>
          <TRPCProvider>
            <body className="min-h-screen">
              <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                disableTransitionOnChange
                enableColorScheme
                enableSystem
              >
                {children}
                <Toaster closeButton richColors />
              </NextThemesProvider>
            </body>
          </TRPCProvider>
        </SessionProvider>
      </html>
    </ErrorBoundary>
  );
}
