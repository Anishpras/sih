import z from "zod";

export const createClientSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  caseId: z.string().optional(),
});

export const loginClientSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const acceptOrderSchema = z.object({
  orderId: z.string(),
});
export const denyOrderSchema = z.object({
  orderId: z.string(),
});

export type AcceptOrderSchema = z.TypeOf<typeof acceptOrderSchema>;
export type DenyOrderSchema = z.TypeOf<typeof denyOrderSchema>;
export type CreateClientSchema = z.TypeOf<typeof createClientSchema>;
export type LoginClientSchema = z.TypeOf<typeof loginClientSchema>;
