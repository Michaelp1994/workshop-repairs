import type { Metadata } from "next";

import ActiveAssetsCard from "./_components/ActiveAssetsCard";
import OngoingRepairsCard from "./_components/OngoingRepairsCard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OngoingRepairsCard />
        <ActiveAssetsCard />
      </div>
    </div>
  );
}
