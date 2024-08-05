// import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

// import postgres from "postgres";

import { schema } from "./schema";

// if (!process.env["DATABASE_URL"]) {
//   throw Error("ensure env variables are set up (DATABASE_URL, NODE_ENV)");
// }

// const conn = postgres(process.env["DATABASE_URL"]);
// if (process.env["NODE_ENV"] !== "production") globalForDb.conn = conn;

export const db = drizzle(sql, { schema });

// export const db = drizzle(conn, { schema });

export type Database = typeof db;
