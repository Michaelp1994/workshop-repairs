import { clients } from "../schemas/clients.schema";
import { locations } from "../schemas/locations.schema";

export const locationOrderMapping = {
  name: locations.name,
  address: locations.address,
  createdAt: locations.createdAt,
  updatedAt: locations.updatedAt,
};

export const locationFilterMapping = {};
