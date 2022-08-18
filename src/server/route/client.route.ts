import { createClientSchema } from "../../../schema/clientSchema.schema";
import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";

export const clientRouter = createRouter()
  .mutation("register-arbitrator", {
    input: createClientSchema,
    async resolve({ ctx, input }) {
      const { name, description, password, username } = input;
      try {
        const client = await ctx.prisma.arbitrator.create({
          data: {
            name,
            description,
            password: sha256(password).toString(),
          },
        });
        return client;
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
      return ctx.client;
    },
  })
  .query("test", {
    resolve({ ctx }) {
      return "Testing";
    },
  });
