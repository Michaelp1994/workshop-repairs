import Image from "next/image";

interface DataTableImageCellProps {
  url: string;
  alt: string;
}

export function DataTableImageCell({ url, alt }: DataTableImageCellProps) {
  return (
    <img
      className="aspect-square rounded-md object-cover"
      src={url}
      alt={alt}
      width={64}
      height={64}
    />
  );
}
