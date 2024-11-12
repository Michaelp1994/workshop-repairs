import { Button } from "@repo/ui/button";
import { Wrench } from "@repo/ui/icons";
import Link from "next/link";

export default function LandingNavBar() {
  return (
    <div className="px-4 py-6">
      <nav className="mx-auto flex max-w-screen-xl items-center justify-between gap-4">
        <Link className="flex gap-2 text-lg font-semibold" href="/">
          <Wrench />
          Workshop Repairs
        </Link>
        <ul className="flex gap-x-6 text-lg font-medium">
          <li>
            <Link href="features">Features</Link>
          </li>
          <li>
            <Link href="docs">Docs</Link>
          </li>
          <li>
            <Link href="pricing">Pricing</Link>
          </li>
          <li>
            <Link href="contact">Contact</Link>
          </li>
        </ul>
        <ul className="flex gap-4 text-lg font-medium">
          <li>
            <Button asChild variant="link">
              <Link href="/login">Sign In</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
