import { clientRouter } from "./client.route";
import { createRouter } from "../createRouter";
import { arbitratorRouter } from "./arbitrators.route";
import {arbitrationCentreRouter} from './arbitrationCentre.route'

export const appRouter = createRouter()
  .merge("arbitrators.", arbitratorRouter)
  .merge("clients.", clientRouter)
  .merge("arbitration-centres.", arbitrationCentreRouter);

export type AppRouter = typeof appRouter;
