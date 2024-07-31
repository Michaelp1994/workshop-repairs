import Link from "next/link";
import ProfileButton from "./ProfileButton";

const navList = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/repairs",
    label: "Repairs",
  },
  {
    to: "/assets",
    label: "Assets",
  },
  {
    to: "/clients",
    label: "Clients",
  },
  {
    to: "/locations",
    label: "Locations",
  },
  {
    to: "/manufacturers",
    label: "Manufacturers",
  },
  {
    to: "/models",
    label: "Models",
  },
  {
    to: "/parts",
    label: "Parts",
  },
];

export default function NavBar() {
  return (
    <header className="bg-background top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {navList.map((navItem) => (
          <Link
            href={navItem.to}
            key={navItem.to}
            className="text-foreground hover:text-foreground transition-colors"
          >
            {navItem.label}
          </Link>
        ))}
      </nav>
      <div className="flex-1" />

      <ProfileButton />
    </header>
  );
}
