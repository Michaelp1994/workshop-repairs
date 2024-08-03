import { auth } from "@repo/auth";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

import NavBar from "~/components/NavBar";
import NextBreadcrumb from "~/components/NextBreadcrumb";
import "~/styles/globals.css";

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
    <div className="grid h-full grid-rows-[auto_1fr]">
      <NavBar />
      <div className="p-4">
        <NextBreadcrumb />
        <main className="center mx-auto max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
