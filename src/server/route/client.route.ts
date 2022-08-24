import {
  createClientSchema,
  loginClientSchema,
} from "../../../schema/clientSchema.schema";
import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";
import { loginAdminSchema } from "../../../schema/adminSchema.schema";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";

export const clientRouter = createRouter()
  .query("detail", {
    resolve({ ctx }) {
      return ctx.client;
    },
  })
  .query("login-client", {
    input: loginClientSchema,
    async resolve({ ctx, input }) {
      const { username, password, name } = input;
      const client = await ctx.prisma.client.findFirst({
        where: {
          username,
          name,
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
