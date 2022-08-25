import z from "zod";

export const createMediationAdminSchema = z.object({
  name: z.string(),
  username: z.string(),
  mediationCentreId: z.string(),
  mediationAdminId: z.string(),
  password: z.string(),
});

export const loginMediationAdminSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const verifyMediatorSchema = z.object({
  mediatorId: z.string(),
});

export type CreateMediationAdminSchema = z.TypeOf<
  typeof createMediationAdminSchema
>;
export type LoginMediationAdminSchema = z.TypeOf<
  typeof loginMediationAdminSchema
>;
export type VerifyMediatorSchema = z.TypeOf<typeof verifyMediatorSchema>;
