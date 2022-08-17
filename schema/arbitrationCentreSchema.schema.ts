import z from "zod";

export const createArbitrationCentreSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.string(),
});

export type CreateArbitrationCentreSchema = z.TypeOf<
  typeof createArbitrationCentreSchema
>;
