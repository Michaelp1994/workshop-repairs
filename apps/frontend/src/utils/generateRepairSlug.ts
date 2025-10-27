import type { RepairID } from "@repo/validators/ids.validators";

export default function generateRepairSlug(repairId: RepairID) {
  return "REP-" + String(repairId).padStart(5, "0");
}
