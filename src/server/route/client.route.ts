import { createRouter } from "../createRouter";

export const clientRouter = createRouter()
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
