import z from "zod";

export const createAdminSchema = z.object({
  name: z.string(),
  username: z.string(),
  arbitrationCentreId: z.string(),
  password: z.string(),
});

export const loginAdminSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type CreateAdminSchema = z.TypeOf<typeof createAdminSchema>;
export type LoginAdminSchema = z.TypeOf<typeof loginAdminSchema>;
