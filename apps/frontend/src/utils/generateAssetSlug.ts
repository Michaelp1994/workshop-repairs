import type { AssetID } from "@repo/validators/ids.validators";

export default function generateAssetSlug(assetId: AssetID) {
  return "AST-" + String(assetId).padStart(5, "0");
}
