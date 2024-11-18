import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui/utils";
import { useRef } from "react";

import { useTruncatedElement } from "~/utils/useTruncatedElement";

export function CommentText({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { isTruncated, isReadingMore, setIsReadingMore } =
    useTruncatedElement(ref);
  return (
    <>
      <p
        className={cn(
          "whitespace-pre-wrap text-sm",
          !isReadingMore && "line-clamp-5",
        )}
        ref={ref}
      >
        {children}
      </p>
      {isTruncated && (
        <Button
          onClick={() => {
            setIsReadingMore((prev) => !prev);
          }}
          size="sm"
          variant="link"
        >
          {isReadingMore ? "Read less" : "Read more"}
        </Button>
      )}
    </>
  );
}
