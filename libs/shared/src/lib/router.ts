import { router } from './trpc';
import { appRouter } from './contracts/app.contract';
import { orderRouter } from './contracts/order.contract';
import { robotRouter } from './contracts/robot.contract';

/**
 * Main application router that combines all sub-routers
 * This is the single source of truth for all tRPC procedures
 */
export const mainRouter = router({
  app: appRouter,
  orders: orderRouter,
  robots: robotRouter,
});

export type MainRouter = typeof mainRouter;
