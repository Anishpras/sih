import z from "zod";

export const createArbitratorSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.string(),
  registrationId: z.string(),
});

export const loginArbitratorSchema = z.object({
  registrationId: z.string(),
  password: z.string(),
});

export type CreateArbitratorSchema = z.TypeOf<typeof createArbitratorSchema>;

export type LoginArbitratorSchema = z.TypeOf<typeof loginArbitratorSchema>;
