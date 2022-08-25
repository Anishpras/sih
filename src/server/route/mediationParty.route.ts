import { createRouter } from "../createRouter";

import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";

import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";
import { loginMediationPartySchema } from "../../../schema/mediationPartySchema.schema";

export const mediationPartyRouter = createRouter()
  .query("detail", {
    resolve({ ctx }) {
      return ctx.mediationParty;
    },
  })
  .query("login-mediation-party", {
    input: loginMediationPartySchema,
    async resolve({ ctx, input }) {
      const { username, password, name } = input;
      const mediationParty = await ctx.prisma.mediationParty.findFirst({
        where: {
          username,
          name,
          password: sha256(password).toString(),
        },
      });
      if (mediationParty) {
        await ctx.prisma.mediationParty.update({
          where: {
            username,
          },
          data: {
            session: true,
          },
        });
      }
      if (!mediationParty) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      if (mediationParty.session === true) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Session Already Active",
        });
      }
      const jwt = signJwt({
        name: mediationParty.name,
        id: mediationParty.id,
        username: mediationParty.username,
        mediationCaseId: mediationParty.mediationCaseId,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("mediationPartyToken", jwt, { path: "/" })
      );
      return mediationParty;
    },
  })
  .query("get-mediation-case-data", {
    async resolve({ ctx }) {
      const mediationCaseDetail = await ctx.prisma.mediationCase.findFirst({
        where: {
          id: ctx?.mediationParty?.mediationCaseId,
        },
      });
      return mediationCaseDetail;
    },
  });
