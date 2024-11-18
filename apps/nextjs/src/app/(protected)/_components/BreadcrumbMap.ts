export default function BreadcrumbMap(pathName: string) {
  switch (pathName) {
    case "/assets":
      return [{ label: "Assets", href: "/assets" }];
    case "/assets/new":
      return [
        { label: "Assets", href: "/assets" },
        { label: "New Asset", href: "/assets/new" },
      ];
    case "/clients":
      return [{ label: "Clients", href: "/clients" }];
    case "/clients/new":
      return [
        { label: "Clients", href: "/clients" },
        { label: "New Client", href: "/clients/new" },
      ];
    case "/dashboard":
      return [];
    case "/equipment-types":
      return [{ label: "Equipment Types", href: "/equipment-types" }];
    case "/equipment-types/new":
      return [
        { label: "Equipment Types", href: "/equipment-types" },
        { label: "New Equipment Type", href: "/equipment-types/new" },
      ];
    case "/locations":
      return [{ label: "Locations", href: "/locations" }];
    case "/locations/new":
      return [
        { label: "Locations", href: "/locations" },
        { label: "New Location", href: "/locations/new" },
      ];
    case "/manufacturers":
      return [{ label: "Manufacturers", href: "/manufacturers" }];
    case "/manufacturers/new":
      return [
        { label: "Manufacturers", href: "/manufacturers" },
        { label: "New Manufacturer", href: "/manufacturers/new" },
      ];
    case "/models":
      return [{ label: "Models", href: "/models" }];
    case "/models/new":
      return [
        { label: "Models", href: "/models" },
        { label: "New Model", href: "/models/new" },
      ];
    case "/parts":
      return [{ label: "Parts", href: "/parts" }];
    case "/parts/new":
      return [
        { label: "Parts", href: "/parts" },
        { label: "New Part", href: "/parts/new" },
      ];
    case "/repairs":
      return [{ label: "Repairs", href: "/repairs" }];
    case "/repairs/new":
      return [
        { label: "Repairs", href: "/repairs" },
        { label: "New Repair", href: "/repairs/new" },
      ];
    case "/users":
      return [{ label: "Users", href: "/users" }];
    case "/users/new":
      return [
        { label: "Users", href: "/users" },
        { label: "New User", href: "/users/new" },
      ];
    default:
      return [];
  }
}
