import { createClientSchema } from "./../../../schema/clientSchema.schema";
import {
  addAnnexureSchema,
  addAwardSchema,
  getSingleCaseSchema,
  addOrderSchema,
} from "./../../../schema/arbitratorSchema.schema";
import {
  createArbitratorSchema,
  createCaseSchema,
  loginArbitratorSchema,
} from "../../../schema/arbitratorSchema.schema";
import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";

export const arbitratorRouter = createRouter()
  .mutation("register-arbitrator", {
    input: createArbitratorSchema,
    async resolve({ ctx, input }) {
      const {
        name,
        description,
        password,
        registrationId,
        adminId,
        mobileNumber,
      } = input;
      try {
        const arbitrator = await ctx.prisma.arbitrator.create({
          data: {
            name,
            description,
            registrationId,
            mobile: mobileNumber,
            otpVerified: true,
            password: sha256(password).toString(),
            Admin: {
              connect: {
                adminId: adminId,
              },
            },
          },
        });
        return arbitrator;
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
      return ctx.arbitrator;
    },
  })
  .query("verify-arbitrator", {
    async resolve({ ctx }) {
      const arbitrator = await ctx.prisma.arbitrator.findMany({
        where: {
          registrationId: ctx.arbitrator?.registrationId,
        },
      });
      return arbitrator[0].verified;
    },
  })
  .query("arbitrator-login", {
    input: loginArbitratorSchema,
    async resolve({ ctx, input }) {
      const { registrationId, password } = input;
      const arbitrator = await ctx.prisma.arbitrator.findFirst({
        where: {
          registrationId,
          password: sha256(password).toString(),
        },
      });
      if (arbitrator) {
        await ctx.prisma.arbitrator.update({
          where: {
            registrationId,
          },
          data: {
            session: true,
          },
        });
      }
      if (!arbitrator) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      if (arbitrator.session === false) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Session Already Active",
        });
      }
      const arbitrationCentre = await ctx.prisma.admin.findFirst({
        where: {
          adminId: ctx?.arbitrator?.adminId,
        },
      });
      const jwt = signJwt({
        name: arbitrator.name,
        registrationId: arbitrator.registrationId,
        id: arbitrator.id,
        adminId: arbitrator.adminId,
        arbitrationCentreId: arbitrationCentre?.arbitrationCentreId,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("arbitratorToken", jwt, { path: "/" })
      );
      return arbitrator;
    },
  })
  .mutation("create-case", {
    input: createCaseSchema,
    async resolve({ ctx, input }) {
      const { caseName, description, caseId } = input;
      try {
        const cases = await ctx.prisma.case.create({
          data: {
            name: caseName,
            description,
            caseId,
            Arbitrator: {
              connect: {
                id: ctx?.arbitrator?.id,
              },
            },
            ArbitrationCentre: {
              connect: {
                arbitrationCentreId: ctx?.arbitrator?.arbitrationCentreId,
              },
            },
          },
        });
        return cases;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Case already exists",
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
  .query("get-cases", {
    async resolve({ ctx }) {
      try {
        const cases = await ctx.prisma.case.findMany({
          where: {
            Arbitrator: {
              id: ctx?.arbitrator?.id,
            },
          },
        });
        return cases;
      } catch (e) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
        });
      }
    },
  })
  .query("get-single-case", {
    input: getSingleCaseSchema,
    async resolve({ ctx, input }) {
      const { caseId } = input;
      const singleCase = await ctx.prisma.case.findFirst({
        where: {
          id: caseId,
        },
      });
      const orders = await ctx.prisma.order.findMany({
        where: {
          caseId: caseId,
        },
      });
      return { caseDetail: singleCase, orders };
    },
  })
  .mutation("create-client", {
    input: createClientSchema,
    async resolve({ ctx, input }) {
      const { name, password, username, caseId } = input;
      try {
        const client = await ctx.prisma.client.create({
          data: {
            name,
            username,
            password: sha256(password).toString(),
            case: {
              connect: {
                id: caseId,
              },
            },
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
  .mutation("add-award", {
    input: addAwardSchema,
    async resolve({ ctx, input }) {
      const { caseId, awardUrl } = input;
      await ctx.prisma.case.update({
        where: {
          id: caseId,
        },
        data: {
          award: awardUrl,
        },
      });
    },
  })
  .mutation("add-annexure", {
    input: addAnnexureSchema,
    async resolve({ ctx, input }) {
      const { caseId, annexureUrl, name, description } = input;
      await ctx.prisma.annexure.create({
        data: {
          link: annexureUrl,
          name,
          description,
          Case: {
            connect: {
              id: caseId,
            },
          },
        },
      });
    },
  })
  .mutation("add-order", {
    input: addOrderSchema,
    async resolve({ ctx, input }) {
      const { caseId, orderData } = input;
      await ctx.prisma.order.create({
        data: {
          description: orderData,
          Case: {
            connect: {
              id: caseId,
            },
          },
        },
      });
    },
  });
