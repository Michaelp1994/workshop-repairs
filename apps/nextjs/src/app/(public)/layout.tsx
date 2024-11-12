import type { ReactNode } from "react";

import PublicFooter from "./components/PublicFooter";
import PublicNavBar from "./components/PublicNavBar";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <PublicNavBar />
      {children}
      <PublicFooter />
    </>
  );
}
