import { mediationCentreRouter } from "./mediationCentre.route";
import { clientRouter } from "./client.route";
import { createRouter } from "../createRouter";
import { arbitratorRouter } from "./arbitrators.route";
import { arbitrationCentreRouter } from "./arbitrationCentre.route";
import { adminRouter } from "./admin.router";
import { mediatorRouter } from "./mediators.route";
import { mediationAdminRouter } from "./mediationAdmin.route";
import { mediationPartyRouter } from "./mediationParty.route";

export const appRouter = createRouter()
  .merge("arbitrators.", arbitratorRouter)
  .merge("clients.", clientRouter)
  .merge("arbitration-centres.", arbitrationCentreRouter)
  .merge("admin.", adminRouter)
  .merge("mediation-centres.", mediationCentreRouter)
  .merge("mediators.", mediatorRouter)
  .merge("mediation-admin.", mediationAdminRouter)
  .merge("mediation-party.", mediationPartyRouter);

export type AppRouter = typeof appRouter;
