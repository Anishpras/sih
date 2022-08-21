import z from "zod";
import {
  verifyAdminSchema,
  VerifyAdminSchema,
} from "./arbitrationCentreSchema.schema";

export const createAdminSchema = z.object({
  name: z.string(),
  username: z.string(),
  arbitrationCentreId: z.string(),
  adminId: z.string(),
  password: z.string(),
});

export const loginAdminSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const verifyArbitratorSchema = z.object({
  arbitratorId: z.string(),
});

export type CreateAdminSchema = z.TypeOf<typeof createAdminSchema>;
export type LoginAdminSchema = z.TypeOf<typeof loginAdminSchema>;
export type VerifyArbitratorSchema = z.TypeOf<typeof verifyArbitratorSchema>;
