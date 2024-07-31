import { manufacturers } from "../schemas/manufacturers.schema";

export const manufacturerOrderMapping = {
  name: manufacturers.name,
  createdAt: manufacturers.createdAt,
  updatedAt: manufacturers.updatedAt,
};

export const manufacturerFilterMapping = {};
