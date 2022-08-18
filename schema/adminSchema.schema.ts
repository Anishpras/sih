import z from "zod";

export const createAdminSchema = z.object({
  name: z.string(),
  username: z.string(),
  arbitrationCentreId: z.string(),
  password: z.string(),
});

export type CreateAdminSchema = z.TypeOf<typeof createAdminSchema>;
