import z from "zod";

export const createClientSchema = z.object({
  name: z.string(),
  username: z.string(),
  description: z.string(),
  password: z.string(),
});

export type CreateClientSchema = z.TypeOf<typeof createClientSchema>;
