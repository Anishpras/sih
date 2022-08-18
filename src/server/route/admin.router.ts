import { createAdminSchema } from "../../../schema/adminSchema.schema";
import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";

export const adminRouter = createRouter()
  .mutation("register-admin", {
    input: createAdminSchema,
    async resolve({ ctx, input }) {
      const { name, arbitrationCentreId, password } = input;
      try {
        const admin = await ctx.prisma.admin.create({
          data: {
            name,
            arbitrationCentreId,
            password: sha256(password).toString(),
          },
        });
        return admin;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "User already exists",
            });
          }
        }

        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
        });
      }
    },
  })
  .query("detail", {
    resolve({ ctx }) {
      return ctx.admin;
    },
  })
  .query("test", {
    resolve({ ctx }) {
      return "Testing";
    },
  });