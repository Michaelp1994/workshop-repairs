import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { api } from "~/trpc/server";

export default async function OngoingRepairsCard() {
  const data = await api.repairs.getCount({
    columnFilters: [
      {
        id: "status",
        value: [1, 2, 3, 4, 5],
      },
    ],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Repairs</CardTitle>
      </CardHeader>
      <CardContent>
        <div>{data}</div>
      </CardContent>
    </Card>
  );
}
