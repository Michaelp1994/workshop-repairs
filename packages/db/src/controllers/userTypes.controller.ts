import { type Database } from "../index";
import { count, eq, isNull } from "drizzle-orm";
import {
  type DeleteUserType,
  type CreateUserType,
  type UpdateUserType,
  userTypes,
  type UserTypeID,
} from "../schemas/user-types.schema";
import { type GetAll, type GetCount } from "../helpers/types";

export default {
  getAll({ pagination }: GetAll, db: Database) {
    const query = db
      .select()
      .from(userTypes)
      .where(isNull(userTypes.deletedAt))
      .orderBy(userTypes.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  },
  async getCount(_: GetCount, db: Database) {
    const query = db
      .select({ count: count() })
      .from(userTypes)
      .where(isNull(userTypes.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  },
  async getById(input: UserTypeID, db: Database) {
    const query = db.select().from(userTypes).where(eq(userTypes.id, input));
    const [res] = await query.execute();
    return res;
  },
  async create(input: CreateUserType, db: Database) {
    const query = db.insert(userTypes).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateUserType, db: Database) {
    const query = db
      .update(userTypes)
      .set(input)
      .where(eq(userTypes.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },

  async delete(input: DeleteUserType, db: Database) {
    const query = db
      .update(userTypes)
      .set(input)
      .where(eq(userTypes.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
