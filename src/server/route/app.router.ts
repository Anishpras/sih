import { createRouter } from "../createRouter";
import { arbitratorRouter } from "./arbitrators.route";

export const appRouter = createRouter().merge("arbitrators.", arbitratorRouter);

export type AppRouter = typeof appRouter;
