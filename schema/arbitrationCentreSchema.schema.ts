import z from "zod";

export const createArbitrationCentreSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.string(),
  arbitrationCentreId: z.string(),
  mobileNumber: z.string(),
});

export const loginArbitrationCentreSchema = z.object({
  arbitrationCentreId: z.string(),
  password: z.string(),
});

export const verifyAdminSchema = z.object({
  adminId: z.string(),
});
export const arbitrationCentreLogOut = z.object({
  arbitrationCentreId: z.string().optional(),
});

export type ArbitrationCentreLogOut = z.TypeOf<typeof arbitrationCentreLogOut>;
export type CreateArbitrationCentreSchema = z.TypeOf<
  typeof createArbitrationCentreSchema
>;

export type LoginArbitrationCentreSchema = z.TypeOf<
  typeof loginArbitrationCentreSchema
>;

export type VerifyAdminSchema = z.TypeOf<typeof verifyAdminSchema>;
