import { manufacturers } from "../schemas/manufacturers.schema";
import { models } from "../schemas/models.schema";

export const modelOrderMapping = {
  name: models.name,
  nickname: models.nickname,
  createdAt: models.createdAt,
  updatedAt: models.updatedAt,
  manufacturer_name: manufacturers.name,
};

export const modelFilterMapping = {
  manufacturer_id: manufacturers.id,
};
