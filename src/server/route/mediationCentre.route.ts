import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";
import {
  createMediationCentreSchema,
  loginMediationCentreSchema,
  verifyMediationAdminSchema,
} from "../../../schema/mediationCentre.schema";
export const mediationCentreRouter = createRouter()
  .mutation("register-mediation-centre", {
    input: createMediationCentreSchema,
    async resolve({ ctx, input }) {
      const { name, description, password, mediationCentreId } = input;
      try {
        const mediationCentre = await ctx.prisma.mediationCentre.create({
          data: {
            name,
            description,
            mediationCentreId,
            password: sha256(password).toString(),
          },
        });
        return mediationCentre;
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
      return ctx.mediationCentre;
    },
  })
  .query("login-mediation-centre", {
    input: loginMediationCentreSchema,
    async resolve({ ctx, input }) {
      const { mediationCentreId, password } = input;
      const mediationCentre = await ctx.prisma.mediationCentre.findFirst({
        where: {
          mediationCentreId,
          password: sha256(password).toString(),
        },
      });
      if (!mediationCentre) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      const jwt = signJwt({
        name: mediationCentre.name,
        id: mediationCentre.id,
        mediationCentreId: mediationCentre.mediationCentreId,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("mediationCentreToken", jwt, { path: "/" })
      );
      return mediationCentre;
    },
  })
  .query("all-mediation-admins", {
    resolve: ({ ctx }) => {
      return ctx.prisma.mediationAdmin.findMany({
        where: {
          mediationCentreId: ctx?.mediationCentre?.mediationCentreId,
        },
      });
    },
  })
  .mutation("verify-mediation-admin", {
    input: verifyMediationAdminSchema,
    async resolve({ ctx, input }) {
      const { mediationAdminId } = input;
      try {
        const mediationAdmin = await ctx.prisma.mediationAdmin.update({
          where: {
            id: mediationAdminId,
          },
          data: {
            verified: true,
          },
        });
        return mediationAdmin;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Admin already verified",
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
