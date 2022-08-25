import z from "zod";

export const createMediatorSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.string(),
  registrationId: z.string(),
  mediationAdminId: z.string(),
  mobileNumber: z.string(),
});

export const loginMediatorSchema = z.object({
  registrationId: z.string(),
  password: z.string(),
});

export const createMediationCaseSchema = z.object({
  caseName: z.string(),
  description: z.string(),
  caseId: z.string(),
});

export const getSingleMediationCaseSchema = z.object({
  caseId: z.string().optional(),
});

export const addMediationAnnexureSchema = z.object({
  caseId: z.string().optional(),
  annexureUrl: z.string(),
  name: z.string(),
  description: z.string(),
});

export const addMediationTimeLineSchema = z.object({
  caseId: z.string().optional(),
  timeLineData: z.string(),
});

export type AddMediationTimeLineSchema = z.TypeOf<
  typeof addMediationTimeLineSchema
>;

export type AddMediationAnnexureSchema = z.TypeOf<
  typeof addMediationAnnexureSchema
>;

export type GetSingleMediationCaseSchema = z.TypeOf<
  typeof getSingleMediationCaseSchema
>;
export type CreateMediationCaseSchema = z.infer<
  typeof createMediationCaseSchema
>;

export type CreateMediatorSchema = z.TypeOf<typeof createMediatorSchema>;

export type LoginMediatorSchema = z.TypeOf<typeof loginMediatorSchema>;
