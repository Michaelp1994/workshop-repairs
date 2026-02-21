import type { RepairID, RepairImageID } from "@repo/validators/ids.validators";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from "@repo/ui/carousel";

import { api } from "~/trpc/client";

interface RepairImageCarouselProps extends CarouselProps {
  repairId: RepairID;
  repairImageId?: RepairImageID;
}

export default function RepairImageCarousel({
  repairId,
  repairImageId,
}: RepairImageCarouselProps) {
  const [repairImages] = api.repairImages.getAllByRepairId.useSuspenseQuery({
    repairId,
  });

  const startIndex = repairImageId
    ? repairImages.findIndex((image) => image.id === repairImageId)
    : 0;

  return (
    <Carousel className="mx-auto max-w-[500px]" opts={{ startIndex }}>
      <CarouselContent>
        {repairImages.map((image) => (
          <CarouselItem key={image.id}>
            <div className="relative">
              <img
                alt={image.caption}
                className="mx-auto aspect-square rounded-md object-scale-down"
                src={image.url}
              />
            </div>
            <div className="text-center">{image.caption}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}
