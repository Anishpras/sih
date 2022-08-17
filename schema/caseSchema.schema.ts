import z from "zod";

export const createCaseSchema = z.object({
  name: z.string(),
  description: z.string(),
  award: z.string(),
  hearingId: z.string(),
  oderId: z.string(),
  awardsId: z.string(),
  arbitrationCentreId: z.string(),
  awardId: z.string(),
});

export type CreateCaseSchema = z.TypeOf<typeof createCaseSchema>;
