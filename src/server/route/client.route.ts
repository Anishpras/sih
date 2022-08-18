import { createClientSchema } from "../../../schema/clientSchema.schema";
import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";
import { loginAdminSchema } from "../../../schema/adminSchema.schema";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";

export const clientRouter = createRouter()
  .mutation("register-client", {
    input: createClientSchema,
    async resolve({ ctx, input }) {
      const { name, password, username } = input;
      try {
        const client = await ctx.prisma.client.create({
          data: {
            name,
            username,
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
  .query("login-client", {
    input: loginAdminSchema,
    async resolve({ ctx, input }) {
      const { username, password } = input;
      const client = await ctx.prisma.client.findFirst({
        where: {
          username,
          password: sha256(password).toString(),
        },
      });
      if (!client) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      const jwt = signJwt({
        name: client.name,
        id: client.id,
        username: client.username,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("clientToken", jwt, { path: "/" })
      );
      return client;
    },
  });
