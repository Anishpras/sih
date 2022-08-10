import { clientRouter } from "./client.route";
import { createRouter } from "../createRouter";
import { arbitratorRouter } from "./arbitrators.route";

export const appRouter = createRouter()
  .merge("arbitrators.", arbitratorRouter)
  .merge("clients.", clientRouter);

export type AppRouter = typeof appRouter;
