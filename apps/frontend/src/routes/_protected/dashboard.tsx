import { createFileRoute } from "@tanstack/react-router";

import ActiveAssetsCard from "~/components/ActiveAssetsCard";
import OngoingRepairsCard from "~/components/OngoingRepairsCard";

export const Route = createFileRoute("/_protected/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OngoingRepairsCard />
        <ActiveAssetsCard />
      </div>
    </div>
  );
}
