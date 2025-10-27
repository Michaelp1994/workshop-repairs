import { Activity } from "@repo/ui/icons";
import { Link } from "@tanstack/react-router";

export default function Logo() {
  return (
    <div>
      <Link className="flex gap-2" to="/">
        <Activity className="h-6 w-6" />
        <span className="font-bold">AssetRx</span>
      </Link>
    </div>
  );
}
