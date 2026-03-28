import { pgGenerate } from "drizzle-dbml-generator";

import { schema } from "../src/schema";

pgGenerate({ schema, out: "./schema.dbml", relational: true });
