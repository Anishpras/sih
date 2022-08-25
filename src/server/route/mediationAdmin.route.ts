import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";
import { createMediationAdminSchema, loginMediationAdminSchema, verifyMediatorSchema } from "../../../schema/mediationAdmin.schema";

export const mediationAdminRouter = createRouter()
  .mutation("mediation-admin-register", {
    input: createMediationAdminSchema,
    async resolve({ ctx, input }) {
      const { name, username, mediationCentreId, password, mediationAdminId } =
        input;
      try {
        const mediationAdmin = await ctx.prisma.mediationAdmin.create({
          data: {
            name,
            username,
            mediationAdminId,
            password: sha256(password).toString(),
            mediationCentre: {
              connect: {
                mediationCentreId: mediationCentreId,
              },
            },
          },
        });
        return mediationAdmin ;
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
          message: "Internal Server Error or Check connection error.",
        });
      }
    },
  })
  .query("detail", {
    resolve({ ctx }) {
      return ctx.mediationAdmin;
    },
  })
  .query("verified-mediation-admin", {
    async resolve({ ctx }) {
      const mediationAdmin = await ctx.prisma.mediationAdmin.findMany({
        where: {
          username: ctx.mediationAdmin?.username,
        },
      });
      return mediationAdmin[0].verified;
    },
  })
  .query("login-mediationAdmin", {
    input: loginMediationAdminSchema,
    async resolve({ ctx, input }) {
      const { username, password } = input;
      const mediationAdmin = await ctx.prisma.mediationAdmin.findFirst({
        where: {
          username,
          password: sha256(password).toString(),
        },
      });
      if (!mediationAdmin) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      const jwt = signJwt({
        name: mediationAdmin.name,
        id: mediationAdmin.id,
        username: mediationAdmin.username,
        mediationAdminId: mediationAdmin.mediationAdminId,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("mediationAdminToken", jwt, { path: "/" })
      );
      return mediationAdmin;
    },
  })
  .query("all-mediators", {
    resolve({ ctx }) {
      return ctx.prisma.mediator.findMany({
        where: {
          mediationAdminId: ctx?.mediationAdmin?.mediationAdminId,
        },
      });
    },
  })
  .mutation("verify-mediator", {
    input: verifyMediatorSchema,
    async resolve({ ctx, input }) {
      const { mediatorId } = input;
      try {
        const mediator = await ctx.prisma.mediator.update({
          where: {
            id: mediatorId,
          },
          data: {
            verified: true,
          },
        });
        return mediator;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Arbitrator already verified",
            });
          }
        }

        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
        });
      }
    },
  });
