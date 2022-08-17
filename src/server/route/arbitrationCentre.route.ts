import {
  createArbitrationCentreSchema,
  loginArbitrationCentreSchema,
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
      const { name, description, password } = input;
      try {
        const arbitrationCentre = await ctx.prisma.arbitrationCentre.create({
          data: {
            name,
            description,
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
      const { name, password } = input;
      const arbitrationCentre = await ctx.prisma.arbitrationCentre.findFirst({
        where: {
          name,
          password: sha256(password).toString(),
        },
      });
      if (!arbitrationCentre) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      const jwt = signJwt({
        name: arbitrationCentre.name,
        id: arbitrationCentre.id,
      });
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("arbitrationCentreToken", jwt, { path: "/" })
      );
      return arbitrationCentre;
    },
  });
