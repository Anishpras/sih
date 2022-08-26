import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import sha256 from "crypto-js/sha256";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";
import {
  addMediationAnnexureSchema,
  addMediationTimeLineSchema,
  createMediationCaseSchema,
  createMediatorSchema,
  getSingleMediationCaseSchema,
  loginMediatorSchema,
} from "../../../schema/mediatorSchema.schema";
import { createMediationPartySchema } from "../../../schema/mediationPartySchema.schema";

export const mediatorRouter = createRouter()
  .mutation("register-mediator", {
    input: createMediatorSchema,
    async resolve({ ctx, input }) {
      const {
        name,
        description,
        password,
        registrationId,
        mediationAdminId,
        mobileNumber,
      } = input;
      try {
        const mediator = await ctx.prisma.mediator.create({
          data: {
            name,
            description,
            registrationId,
            mobile: mobileNumber,
            otpVerified: true,
            password: sha256(password).toString(),
            MediationAdmin: {
              connect: {
                mediationAdminId: mediationAdminId,
              },
            },
          },
        });
        return mediator;
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
      return ctx.mediator;
    },
  })
  .query("verify-mediator", {
    async resolve({ ctx }) {
      const mediator = await ctx.prisma.mediator.findMany({
        where: {
          registrationId: ctx.mediator?.registrationId,
        },
      });
      return mediator[0].verified;
    },
  })
  .query("mediator-login", {
    input: loginMediatorSchema,
    async resolve({ ctx, input }) {
      const { registrationId, password } = input;
      const mediator = await ctx.prisma.mediator.findFirst({
        where: {
          registrationId,
          password: sha256(password).toString(),
        },
      });

      if (mediator) {
        await ctx.prisma.mediator.update({
          where: {
            registrationId,
          },
          data: {
            session: true,
          },
        });
      }

      if (!mediator) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      if (mediator.session === true) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Session Already Active",
        });
      }
      const mediationCentre = await ctx.prisma.mediationAdmin.findFirst({
        where: {
          mediationAdminId: ctx?.mediator?.mediationAdminId,
        },
      });
      const jwt = signJwt({
        name: mediator.name,
        registrationId: mediator.registrationId,
        id: mediator.id,
        mediationAdminId: mediator.mediationAdminId,
        mediationCentreId: mediationCentre?.mediationCentreId,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("mediatorToken", jwt, { path: "/" })
      );
      return mediator;
    },
  })
  .mutation("create-mediation-case", {
    input: createMediationCaseSchema,
    async resolve({ ctx, input }) {
      const { caseName, description, caseId } = input;
      try {
        const mediationCases = await ctx.prisma.mediationCase.create({
          data: {
            name: caseName,
            description,
            caseId,
            mediator: {
              connect: {
                id: ctx?.mediator?.id,
              },
            },
            mediationCentre: {
              connect: {
                mediationCentreId: ctx?.mediator?.id,
              },
            },
          },
        });
        return mediationCases;
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
  .query("get-mediation-cases", {
    async resolve({ ctx }) {
      const mediationCases = await ctx.prisma.mediationCase.findMany({
        where: {
          mediator: {
            id: ctx?.mediator?.id,
          },
        },
      });
      return mediationCases;
    },
  })
  .query("get-single-mediation-case", {
    input: getSingleMediationCaseSchema,
    async resolve({ ctx, input }) {
      const { caseId } = input;
      const singleMediationCase = await ctx.prisma.mediationCase.findFirst({
        where: {
          id: caseId,
        },
      });
      const timeline = await ctx.prisma.mediationTimeLine.findMany({
        where: {
          mediationCaseId: caseId,
        },
      });
      return { caseDetail: singleMediationCase, timeline };
    },
  })
  .mutation("create-mediation-party", {
    input: createMediationPartySchema,
    async resolve({ ctx, input }) {
      const { name, password, username, caseId } = input;
      try {
        const mediationParty = await ctx.prisma.mediationParty.create({
          data: {
            name,
            username,
            password: sha256(password).toString(),
            MediationCase: {
              connect: {
                id: caseId,
              },
            },
          },
        });
        return mediationParty;
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
  .mutation("add-mediation-annexure", {
    input: addMediationAnnexureSchema,
    async resolve({ ctx, input }) {
      const { caseId, annexureUrl, name, description } = input;
      await ctx.prisma.mediationAnnexure.create({
        data: {
          link: annexureUrl,
          name,
          description,
          MediationCase: {
            connect: {
              id: caseId,
            },
          },
        },
      });
    },
  })
  .mutation("add-mediation-timeline", {
    input: addMediationTimeLineSchema,
    async resolve({ ctx, input }) {
      const { caseId, timeLineData } = input;
      await ctx.prisma.order.create({
        data: {
          description: timeLineData,
          Case: {
            connect: {
              id: caseId,
            },
          },
        },
      });
    },
  });
