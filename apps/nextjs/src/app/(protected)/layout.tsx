import { type Metadata } from "next";

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
