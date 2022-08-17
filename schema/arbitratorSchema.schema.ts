import z from "zod";

export const createArbitratorSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.string(),
  registrationId: z.string(),
});

export type CreateArbitratorSchema = z.TypeOf<typeof createArbitratorSchema>;
