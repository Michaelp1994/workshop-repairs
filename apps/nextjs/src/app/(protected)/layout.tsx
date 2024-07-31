import { auth } from "@repo/auth";
import { Toaster } from "@repo/ui/sonner";
import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { redirect } from "next/navigation";

import NavBar from "~/app/_components/NavBar";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

import NextBreadcrumb from "../_components/Breadcrumb";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Workshop App",
  description: "Workshop App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: RootLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <html className={`${fontSans.variable} h-full`} lang="en">
      <body className="bg-muted/40 h-screen w-screen">
        <TRPCReactProvider>
          <div className="grid h-screen w-screen grid-rows-[auto_1fr]">
            <NavBar />
            <div className="p-4">
              <NextBreadcrumb />
              <div className="center mx-auto max-w-7xl">{children}</div>
            </div>
          </div>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
