import z from "zod";

export const createArbitratorSchema = z.object({
  name: z.string(),
  description: z.string(),
  password: z.string(),
  registrationId: z.string(),
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



export type CreateCaseSchema = z.infer<typeof createCaseSchema>;

export type CreateArbitratorSchema = z.TypeOf<typeof createArbitratorSchema>;

export type LoginArbitratorSchema = z.TypeOf<typeof loginArbitratorSchema>;
