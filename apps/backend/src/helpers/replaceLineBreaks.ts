export default function replaceLineBreaks(val: unknown) {
  if (typeof val === "string") {
    return val.replaceAll(/\n+/g, "\n");
  }

  return val;
}
