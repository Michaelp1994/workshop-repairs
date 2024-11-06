import ActiveAssetsCard from "./_components/ActiveAssetsCard";
import OngoingRepairsCard from "./_components/OngoingRepairsCard";

export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* <OngoingRepairsCard />
        <ActiveAssetsCard /> */}
      </div>
    </div>
  );
}
