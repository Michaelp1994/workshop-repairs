import { Button } from "@repo/ui/button";
import Link from "next/link";

import isAuthenticated from "~/auth/isAuthenticated";
import Logo from "~/components/Logo";

const links = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
];

export default async function PublicNavBar() {
  const authenticated = await isAuthenticated();
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-2 py-4 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Logo />
        <nav className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => (
            <a
              className="text-sm font-medium underline-offset-4 hover:underline"
              href={link.href}
              key={link.name}
            >
              {link.name}
            </a>
          ))}
          {authenticated ? (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="destructive">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
