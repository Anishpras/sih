import z from "zod";

export const createHearingSchema = z.object({
  name: z.string(),
  description: z.string(),
  caseId: z.string(),
});

export type CreateHearingSchema = z.TypeOf<typeof createHearingSchema>;
