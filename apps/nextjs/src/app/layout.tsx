import { Toaster } from "@repo/ui/sonner";
import { cn } from "@repo/ui/utils";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";
import { AuthProvider } from "~/auth/AuthContext";
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
  title: {
    template: "%s | AssetRx",
    default: "AssetRx",
  },
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
        "min-h-screen w-full scroll-smooth antialiased",
        fontHeading.variable,
        fontBody.variable,
      )}
      lang="en"
    >
      <AuthProvider>
        <TRPCReactProvider>
          <body className="min-h-screen w-full">
            {children}
            <Toaster closeButton richColors />
          </body>
        </TRPCReactProvider>
      </AuthProvider>
    </html>
  );
}
