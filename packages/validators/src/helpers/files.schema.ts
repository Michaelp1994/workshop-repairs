import {
  addIssueToContext,
  type ParseContext,
  type ParseInput,
  type ParseReturnType,
  ParseStatus,
  z,
  type ZodTypeDef,
} from "zod";

export interface ZodFileDef extends ZodTypeDef {
  checks: ZodFileCheck[];
  typeName: "file";
}

type ZodFileCheck =
  | { kind: "mimeType"; allowedTypes: string[]; message?: string }
  | { kind: "size"; size: number; message?: string };

class ZodFile extends z.ZodType<File, ZodFileDef, File> {
  _addCheck(check: ZodFileCheck) {
    return new ZodFile({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  _parse(input: ParseInput): ParseReturnType<File> {
    if (!(input.data instanceof File)) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: "custom",
        message: "Input must be a File",
      });
      return { status: "aborted" };
    }
    const status = new ParseStatus();
    let ctx: undefined | ParseContext = undefined;

    for (const check of this._def.checks) {
      if (check.kind === "mimeType") {
        if (!check.allowedTypes.includes(input.data.type)) {
          ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: "custom",
            message: check.message ?? "Invalid file type",
          });
          status.dirty();
        }
      } else if (check.kind === "size") {
        if (input.data.size > check.size) {
          ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: "custom",
            message: check.message ?? "File size too large",
          });
          status.dirty();
        }
      }
    }
    return { status: status.value, value: input.data };
  }

  mimeType(allowedTypes: string[], opts?: { message: string }) {
    return this._addCheck({
      kind: "mimeType",
      allowedTypes,
      message: opts?.message ?? "Invalid file type",
    });
  }
  size(size: number, opts?: { message: string }) {
    return this._addCheck({
      kind: "size",
      size,
      message: opts?.message ?? "File size too large",
    });
  }
}

export const zFile = () =>
  new ZodFile({
    checks: [],
    typeName: "file",
  });
