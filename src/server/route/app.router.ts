import { clientRouter } from "./client.route";
import { createRouter } from "../createRouter";
import { arbitratorRouter } from "./arbitrators.route";
import { arbitrationCentreRouter } from "./arbitrationCentre.route";
import { adminRouter } from "./admin.router";

export const appRouter = createRouter()
  .merge("arbitrators.", arbitratorRouter)
  .merge("clients.", clientRouter)
  .merge("arbitration-centres.", arbitrationCentreRouter)
  .merge("admin.", adminRouter);

export type AppRouter = typeof appRouter;
