import { createRouter } from "../createRouter";

export const arbitratorRouter = createRouter()
  .query("detail", {
    resolve({ ctx }) {
      return ctx.arbitrator;
    },
  })
  .query("test", {
    resolve({ ctx }) {
      return "Testing";
    },
  });
