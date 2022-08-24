import z from "zod";

export const createClientSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  caseId: z.string().optional(),
});

export const loginClientSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string()
});

export type CreateClientSchema = z.TypeOf<typeof createClientSchema>;
export type LoginClientSchema = z.TypeOf<typeof loginClientSchema>;
