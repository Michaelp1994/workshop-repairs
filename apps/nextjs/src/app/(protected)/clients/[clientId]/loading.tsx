import { Skeleton } from "@repo/ui/skeleton";

import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/components/DetailsPage";

export default function LoadingClientPage() {
  return (
    <DetailsPageGrid>
      <DetailsPageMainColumn>
        <Skeleton className="h-[252px] bg-white" />
        <Skeleton className="h-16 bg-white" />
        <Skeleton className="h-16 bg-white" />
      </DetailsPageMainColumn>
      <DetailsPageSecondaryColumn></DetailsPageSecondaryColumn>
    </DetailsPageGrid>
  );
}
