import { Toaster } from "@repo/ui/sonner";
import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "~/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={`${fontSans.variable} h-full`} lang="en">
      <body className="h-full">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
