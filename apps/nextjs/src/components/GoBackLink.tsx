import { ChevronLeft } from "@repo/ui/icons";
import { Link } from "@tanstack/react-router";

export default function GoBackLink({ href }: { href: string }) {
  return (
    <div>
      <Link className="text-muted-foreground" href={href}>
        <ChevronLeft className="mr-1 inline-block" />
        <span>Back</span>
      </Link>
    </div>
  );
}
