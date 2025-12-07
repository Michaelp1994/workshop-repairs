import { QueryBuilder } from "drizzle-orm/pg-core";

interface SingleRowQueryExecutor<T> {
  execute: () => Promise<T[]>;
}

// A generic utility function to handle single-row query execution
export async function returnOne<T>(
  query: SingleRowQueryExecutor<T>,
): Promise<T> {
  const results = await query.execute();
  const [result] = results;

  if (!result) {
    // Customize this error handling as needed (e.g., specific NotFoundError)
    throw new Error("Query expected exactly one result but found none.");
  }

  // Optional: Check if more than one result was returned (for extra safety)
  if (results.length > 1) {
    // Log a warning if your query setup is accidentally returning multiple rows
    console.warn("Query intended for a single row returned multiple results.");
  }

  return result;
}
