import { arbitrationCentreLogOut } from "./../../../schema/arbitrationCentreSchema.schema";
import {
  createArbitrationCentreSchema,
  loginArbitrationCentreSchema,
  verifyAdminSchema,
} from "../../../schema/arbitrationCentreSchema.schema";
import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";
export const arbitrationCentreRouter = createRouter()
  .mutation("register-arbitration-centre", {
    input: createArbitrationCentreSchema,
    async resolve({ ctx, input }) {
      const { name, description, password, arbitrationCentreId, mobileNumber } =
        input;
      try {
        const arbitrationCentre = await ctx.prisma.arbitrationCentre.create({
          data: {
            name,
            description,
            arbitrationCentreId,
            mobile: mobileNumber,
            otpVerified: true,
            password: sha256(password).toString(),
          },
        });
        return arbitrationCentre;
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
      return ctx.arbitrationCentre;
    },
  })
  .query("login-arbitration-centre", {
    input: loginArbitrationCentreSchema,
    async resolve({ ctx, input }) {
      const { arbitrationCentreId, password } = input;
      const arbitrationCentre = await ctx.prisma.arbitrationCentre.findFirst({
        where: {
          arbitrationCentreId,
          password: sha256(password).toString(),
        },
      });

      if (arbitrationCentre) {
        await ctx.prisma.arbitrationCentre.update({
          where: {
            arbitrationCentreId,
          },
          data: {
            session: true,
          },
        });
      }

      if (!arbitrationCentre) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      if (arbitrationCentre.session === true) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Session Already Active",
        });
      }
      const jwt = signJwt({
        name: arbitrationCentre.name,
        id: arbitrationCentre.id,
        arbitrationCentreId: arbitrationCentre.arbitrationCentreId,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("arbitrationCentreToken", jwt, { path: "/" })
      );
      return arbitrationCentre;
    },
  })
  .query("all-admins", {
    resolve: ({ ctx }) => {
      console.log(ctx);
      return ctx.prisma.admin.findMany({
        where: {
          arbitrationCentreId: ctx?.arbitrationCentre?.arbitrationCentreId,
        },
      });
    },
  })
  .mutation("verify-admin", {
    input: verifyAdminSchema,
    async resolve({ ctx, input }) {
      const { adminId } = input;
      try {
        const admin = await ctx.prisma.admin.update({
          where: {
            id: adminId,
          },
          data: {
            verified: true,
          },
        });
        return admin;
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
  })
  .query("all-cases", {
    resolve: ({ ctx }) => {
      return ctx.prisma.case.findMany({
        where: {
          arbitrationCentreId: ctx?.arbitrationCentre?.id,
        },
      });
    },
  })
  .mutation("log-out", {
    input: arbitrationCentreLogOut,
    resolve: async ({ ctx, input }) => {
      const { arbitrationCentreId } = input;
      await ctx.prisma.arbitrationCentre.update({
        where: {
          arbitrationCentreId,
        },
        data: {
          session: false,
        },
      });
    },
  });
