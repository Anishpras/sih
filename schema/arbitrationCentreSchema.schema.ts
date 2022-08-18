import z from "zod";

export const createArbitrationCentreSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.string(),
  arbitrationCentreId: z.string(),
});

export const loginArbitrationCentreSchema = z.object({
  arbitrationCentreId: z.string(),
  password: z.string(),
});

export type CreateArbitrationCentreSchema = z.TypeOf<
  typeof createArbitrationCentreSchema
>;

export type LoginArbitrationCentreSchema = z.TypeOf<
  typeof loginArbitrationCentreSchema
>;
