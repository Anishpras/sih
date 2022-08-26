import z from "zod";

export const createMediationPartySchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  caseId: z.string().optional(),
});

export const loginMediationPartySchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
});

export const logoutMediationPartySchema = z.object({
  mediationPartyId: z.string().optional(),
});

export type CreateMediationPartySchema = z.TypeOf<
  typeof createMediationPartySchema
>;
export type LoginMediationPartySchema = z.TypeOf<
  typeof loginMediationPartySchema
>;
export type LogoutMediationPartySchema = z.TypeOf<
  typeof logoutMediationPartySchema
>;
