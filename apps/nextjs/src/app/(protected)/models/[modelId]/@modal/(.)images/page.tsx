import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { type ModelID } from "@repo/validators/ids.validators";
import { useNavigate } from "@tanstack/react-router";
import { use } from "react";

import ModelImageCarousel from "../../../../../../components/ModelImages/ModelImageCarousel";

interface ModelImageGalleryPageProps {
  params: Promise<{
    modelId: ModelID;
  }>;
}

export default function ModelImageGalleryPage(
  props: ModelImageGalleryPageProps,
) {
  const params = use(props.params);
  const modelId = Number(params.modelId);
  const navigate = useNavigate();
  return (
    <Dialog
      defaultOpen
      onOpenChange={() => {
        router.back();
      }}
      open
    >
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gallery</DialogTitle>
            <DialogDescription>
              Images associated with repair {modelId}
            </DialogDescription>
          </DialogHeader>
          <div className="p-10">
            <ModelImageCarousel modelId={modelId} />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
