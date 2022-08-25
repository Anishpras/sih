import { loginClientSchema } from "../../../schema/clientSchema.schema";
import { createRouter } from "../createRouter";

import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";

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
      if (client) {
        await ctx.prisma.client.update({
          where: {
            username,
          },
          data: {
            session: true,
          },
        });
      }
      if (!client) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      if (client.session === true) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Session Already Active",
        });
      }

      const jwt = signJwt({
        name: client.name,
        id: client.id,
        username: client.username,
        caseId: client.caseId,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("clientToken", jwt, { path: "/" })
      );
      return client;
    },
  })
  .query("get-case-data", {
    async resolve({ ctx }) {
      const caseDetail = await ctx.prisma.case.findFirst({
        where: {
          id: ctx?.client?.caseId,
        },
      });
      return caseDetail;
    },
  });
