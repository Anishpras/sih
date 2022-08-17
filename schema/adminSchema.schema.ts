import z from "zod";

export const createAdminSchema = z.object({
  name: z.string(),
  arbitrationCentreId: z.string(),
});

export type CreateAdminSchema = z.TypeOf<typeof createAdminSchema>;
