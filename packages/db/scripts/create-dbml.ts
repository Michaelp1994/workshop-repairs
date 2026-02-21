import { pgGenerate } from "drizzle-dbml-generator"; // Using Postgres for this example

import { schema } from "../src/schema";

pgGenerate({ schema, out: "./schema.dbml", relational: true });
