import { createArbitrationCentreSchema } from "../../../schema/arbitrationCentreSchema.schema";
import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
export const arbitrationCentreRouter = createRouter()
  .mutation("register-arbitration-centre", {
    input: createArbitrationCentreSchema,
    async resolve({ ctx, input }) {
      const { name, description } = input;
       try{
        const arbitrationCentre = await ctx.prisma.arbitrationCentre.create({
          data: {
            name,
            description,
          },
        });
        return arbitrationCentre;
       } catch (e){
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
       }
  })
  .query("detail", {
    resolve({ ctx }) {
      return ctx.arbitrationCentre;
    },
  })
  .query("test", {
    resolve({ ctx }) {
      return "Testing";
    },
  });
