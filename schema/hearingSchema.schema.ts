import z from "zod";

export const createHearingSchema = z.object({
  name: z.string(),
  description: z.string(),
  evidence: z.string(),
  arguments: z.string(),
});

export type CreateHearingSchema = z.TypeOf<typeof createHearingSchema>;
