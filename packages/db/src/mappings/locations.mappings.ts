import { locationTable } from "../schemas/location.table";

export const locationOrderMapping = {
  name: locationTable.name,
  address: locationTable.address,
  createdAt: locationTable.createdAt,
  updatedAt: locationTable.updatedAt,
};

export const locationFilterMapping = {};
