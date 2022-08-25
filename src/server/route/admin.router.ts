import {
  loginAdminSchema,
  verifyArbitratorSchema,
} from "./../../../schema/adminSchema.schema";
import { createAdminSchema } from "../../../schema/adminSchema.schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";

export const adminRouter = createRouter()
  .mutation("admin-register", {
    input: createAdminSchema,
    async resolve({ ctx, input }) {
      const {
        name,
        username,
        arbitrationCentreId,
        password,
        adminId,
        mobileNumber,
      } = input;
      try {
        const admin = await ctx.prisma.admin.create({
          data: {
            name,
            username,
            adminId,
            mobile: mobileNumber,
            otpVerified: true,
            password: sha256(password).toString(),
            arbitrationCentre: {
              connect: {
                arbitrationCentreId: arbitrationCentreId,
              },
            },
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
          message: "Internal Server Error or Check connection error.",
        });
      }
    },
  })
  .query("detail", {
    resolve({ ctx }) {
      return ctx.admin;
    },
  })
  .query("verified-admin", {
    async resolve({ ctx }) {
      const admin = await ctx.prisma.admin.findMany({
        where: {
          username: ctx.admin?.username,
        },
      });
      return admin[0].verified;
    },
  })
  .query("login-admin", {
    input: loginAdminSchema,
    async resolve({ ctx, input }) {
      const { username, password } = input;
      const admin = await ctx.prisma.admin.findFirst({
        where: {
          username,
          password: sha256(password).toString(),
        },
      });

      if (admin) {
        await ctx.prisma.admin.update({
          where: {
            username,
          },
          data: {
            session: true,
          },
        });
      }

      if (!admin) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      if (admin.session === true) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Session Already Active",
        });
      }
      const jwt = signJwt({
        name: admin.name,
        id: admin.id,
        username: admin.username,
        adminId: admin.adminId,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("adminToken", jwt, { path: "/" })
      );
      return admin;
    },
  })
  .query("all-arbitrators", {
    resolve({ ctx }) {
      console.log(ctx?.admin?.adminId);
      return ctx.prisma.arbitrator.findMany({
        where: {
          adminId: ctx?.admin?.adminId,
        },
      });
    },
  })
  .mutation("verify-arbitrator", {
    input: verifyArbitratorSchema,
    async resolve({ ctx, input }) {
      const { arbitratorId } = input;
      try {
        const arbitrator = await ctx.prisma.arbitrator.update({
          where: {
            id: arbitratorId,
          },
          data: {
            verified: true,
          },
        });
        return arbitrator;
      } catch (e: any) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message,
        });
      }
    },
  });
