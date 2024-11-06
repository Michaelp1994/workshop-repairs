"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from "@repo/ui/carousel";
import { useSearchParams } from "next/navigation";

import { api } from "~/trpc/client";

interface RepairImageCarouselProps extends CarouselProps {
  repairId: RepairID;
}

export default function RepairImageCarousel({
  repairId,
}: RepairImageCarouselProps) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const repairImageId = id ? Number(id) : undefined;
  const { data, isLoading, isError } =
    api.repairImages.getAllByRepairId.useQuery({
      repairId,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error loading model images</div>;
  }

  const startIndex = repairImageId
    ? data.findIndex((image) => image.id === repairImageId)
    : 0;

  return (
    <Carousel className="mx-auto max-w-[500px]" opts={{ startIndex }}>
      <CarouselContent>
        {data.map((image) => (
          <CarouselItem key={image.id}>
            <div className="relative">
              <img
                alt={image.caption}
                className="mx-auto aspect-square rounded-md object-scale-down"
                src={image.url}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}
