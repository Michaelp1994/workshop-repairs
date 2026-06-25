export function createSlug(prefix: string, localId: number) {
  const stringId = localId.toFixed(0);
  const paddedId = stringId.padStart(5, "0");
  return `${prefix}${paddedId}`;
}
