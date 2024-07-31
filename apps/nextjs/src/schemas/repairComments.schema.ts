import { z } from "zod";

export const repairCommentFormSchema = z.object({
    comment: z.string().min(3),
});

export type RepairCommentFormInput = z.infer<typeof repairCommentFormSchema>;

export const defaultRepairComment: RepairCommentFormInput = {
    comment: "",
};
