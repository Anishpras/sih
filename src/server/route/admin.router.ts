import {
  loginAdminSchema,
  verifyArbitratorSchema,
} from "./../../../schema/adminSchema.schema";
import { createAdminSchema } from "../../../schema/adminSchema.schema";
import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";
import { resolve } from "path";

export const adminRouter = createRouter()
  .mutation("admin-register", {
    input: createAdminSchema,
    async resolve({ ctx, input }) {
      const { name, username, arbitrationCentreId, password, adminId } = input;
      try {
        const admin = await ctx.prisma.admin.create({
          data: {
            name,
            username,
            adminId,
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
  //TODO: return admin as object
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
      if (!admin) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      const jwt = signJwt({
        name: admin.name,
        id: admin.id,
        username: admin.username,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("adminToken", jwt, { path: "/" })
      );
      return admin;
    },
  })
  .query("all-arbitrators", {
    async resolve({ ctx }) {
      const arbitrators = await ctx.prisma.arbitrator.findMany({
        where: {
          adminId: ctx?.admin?.adminId,
        },
      });
      return arbitrators;
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
