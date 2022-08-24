import z from "zod";

export const createArbitratorSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.string(),
  registrationId: z.string(),
  adminId: z.string(),
});

export const loginArbitratorSchema = z.object({
  registrationId: z.string(),
  password: z.string(),
});

export const createCaseSchema = z.object({
  caseName: z.string(),
  description: z.string(),
  caseId: z.string(),
});

export const getSingleCaseSchema = z.object({
  caseId: z.string().optional(),
});

export const addAwardSchema = z.object({
  caseId: z.string().optional(),
  awardUrl: z.string().optional(),
});

export const addAnnexureSchema = z.object({
  caseId: z.string().optional(),
  annexureUrl: z.string(),
  name: z.string(),
  description: z.string(),
});

export type AddAnnexureSchema = z.TypeOf<typeof addAnnexureSchema>;

export type GetSingleCaseSchema = z.TypeOf<typeof getSingleCaseSchema>;
export type CreateCaseSchema = z.infer<typeof createCaseSchema>;

export type CreateArbitratorSchema = z.TypeOf<typeof createArbitratorSchema>;

export type LoginArbitratorSchema = z.TypeOf<typeof loginArbitratorSchema>;
