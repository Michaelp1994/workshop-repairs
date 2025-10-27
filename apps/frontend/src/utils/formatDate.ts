import { format } from "date-fns";

export function formatDate(
  date: string | undefined | null | Date,
  formatStr?: string,
): string {
  if (!date) {
    return "";
  }

  return format(date, formatStr ?? "dd/MM/yyyy");
}
