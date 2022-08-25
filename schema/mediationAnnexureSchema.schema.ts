import z from "zod";

export const createMediationAnnexureSchema = z.object({
  name: z.string(),
  mediationCentreId: z.string(),
  link: z.string(),
});

export type CreateMediationAnnexureSchema = z.TypeOf<
  typeof createMediationAnnexureSchema
>;
