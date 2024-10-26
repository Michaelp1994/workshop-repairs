import { SessionProvider } from "@repo/auth/react";
import { Toaster } from "@repo/ui/sonner";
import { cn } from "@repo/ui/utils";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

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
  title: "Workshop App",
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
        "h-screen antialiased",
        fontHeading.variable,
        fontBody.variable,
      )}
      lang="en"
    >
      <body className="bg-muted/40 h-full">
        <SessionProvider>
          <TRPCReactProvider>
            {children}
            <Toaster closeButton richColors />
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
