import z from "zod";

export const createAdminSchema = z.object({
  name: z.string(),
  username: z.string(),
  arbitrationCentreId: z.string(),
  adminId: z.string(),
  password: z.string(),
  mobileNumber: z.string(),
});

export const loginAdminSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const verifyArbitratorSchema = z.object({
  arbitratorId: z.string(),
});

export const addHearingSchema = z.object({
  caseId: z.string(),
  dateTime: z.date(),
  arbitratorId: z.string().optional(),
});

export const logoutAdminSchema = z.object({
  adminId: z.string().optional(),
});

export type AddHearingSchema = z.TypeOf<typeof addHearingSchema>;
export type CreateAdminSchema = z.TypeOf<typeof createAdminSchema>;
export type LoginAdminSchema = z.TypeOf<typeof loginAdminSchema>;
export type VerifyArbitratorSchema = z.TypeOf<typeof verifyArbitratorSchema>;
export type LogoutAdminSchema = z.TypeOf<typeof logoutAdminSchema>;
