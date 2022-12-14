import z from "zod";
import { logoutMediationAdminSchema } from "./mediationAdmin.schema";

export const createMediationCentreSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.string(),
  mediationCentreId: z.string(),
  mobileNumber: z.string(),
});

export const loginMediationCentreSchema = z.object({
  mediationCentreId: z.string(),
  password: z.string(),
});

export const logoutMediationCentreSchema = z.object({
  mediationCentreId: z.string().optional(),
});

export const verifyMediationAdminSchema = z.object({
  mediationAdminId: z.string(),
});

export type CreateMediationCentreSchema = z.TypeOf<
  typeof createMediationCentreSchema
>;

export type LoginMediationCentreSchema = z.TypeOf<
  typeof loginMediationCentreSchema
>;

export type VerifyMediationAdminSchema = z.TypeOf<
  typeof verifyMediationAdminSchema
>;

export type LogoutMediationAdminSchema = z.TypeOf<
  typeof logoutMediationAdminSchema
>;
