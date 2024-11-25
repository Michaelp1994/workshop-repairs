"use client";
import type { ModelID, ModelImageID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/carousel";
import { Star } from "@repo/ui/icons";
import { toast } from "@repo/ui/sonner";
import { cn } from "@repo/ui/utils";
import { useSearchParams } from "next/navigation";

import { api } from "~/trpc/client";

interface ModelImageCarouselProps {
  modelId: ModelID;
  imageId?: ModelImageID;
}

export default function ModelImageCarousel({
  modelId,
}: ModelImageCarouselProps) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const modelImageId = id ? Number(id) : undefined;
  const [repairImages] = api.modelImages.getAllByModelId.useSuspenseQuery({
    modelId,
  });

  const startIndex = modelImageId
    ? repairImages.findIndex((image) => image.id === modelImageId)
    : 0;

  return (
    <Carousel className="mx-auto max-w-[500px]" opts={{ startIndex }}>
      <CarouselContent>
        {repairImages.map((image) => (
          <CarouselItem key={image.id}>
            <div className="relative">
              <img
                alt={image.caption ?? ""}
                className="mx-auto aspect-square rounded-md object-scale-down"
                src={image.url}
              />
              <FavouriteButton favourite={image.favourite} id={image.id} />
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

interface FavouriteButtonProps {
  favourite: boolean;
  id: number;
}

function FavouriteButton({ favourite, id }: FavouriteButtonProps) {
  const utils = api.useUtils();
  const favouriteMutation = api.modelImages.setFavourite.useMutation({
    async onSuccess() {
      await utils.modelImages.getAllByModelId.invalidate();
      toast.success("Favourite updated");
    },
  });
  return (
    <Button
      className="absolute right-0 top-0"
      onClick={() => {
        if (!favourite) favouriteMutation.mutate({ id });
      }}
      size="icon"
      variant="ghost"
    >
      <Star className={cn("h-4 w-4", favourite && "fill-current")} />
    </Button>
  );
}
