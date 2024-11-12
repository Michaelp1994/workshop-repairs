"use client";
import { Button } from "@repo/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from "@repo/ui/carousel";
import { Star } from "@repo/ui/icons";
import { toast } from "@repo/ui/sonner";
import { cn } from "@repo/ui/utils";

import { api } from "~/trpc/client";

interface ModelImageCarouselProps extends CarouselProps {
  images: {
    id: number;
    url: string;
    caption: string | null;
    favourite: boolean;
  }[];
}

export default function ModelImageCarousel({
  images,
  ...props
}: ModelImageCarouselProps) {
  return (
    <Carousel className="mx-auto max-w-[500px]" {...props}>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="relative">
              <img
                alt={image.caption ?? ""}
                className="mx-auto aspect-square rounded-md object-scale-down"
                src={image.url}
              />
              <FavouriteButton favourite={image.favourite} id={image.id} />
            </div>
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
