import z from "zod";

export const createAnnexureSchema = z.object({
  name: z.string(),
  arbitrationCentreId: z.string(),
  link: z.string(),
});

export type CreateAnnexureSchema = z.TypeOf<typeof createAnnexureSchema>;
