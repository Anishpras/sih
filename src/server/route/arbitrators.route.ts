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
      const { name, description, password, registrationId } = input;
      try {
        const arbitrator = await ctx.prisma.arbitrator.create({
          data: {
            name,
            description,
            registrationId,
            password: sha256(password).toString(),
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
      if (!arbitrator) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      const jwt = signJwt({
        name: arbitrator.name,
        registrationId: arbitrator.registrationId,
        id: arbitrator.id,
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
      const cases = await ctx.prisma.case.findMany({
        where: {
          Arbitrator: {
            id: ctx?.arbitrator?.id,
          },
        },
      });
      return cases;
    },
  });
