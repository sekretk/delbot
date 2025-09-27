import { initTRPC } from '@trpc/server';

/**
 * Initialize tRPC with context type
 */
const t = initTRPC.create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof Error
            ? error.cause.message
            : null,
      },
    };
  },
});

/**
 * Export reusable router and procedure helpers
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

/**
 * This is the primary router for the application
 * All other routers will be merged into this one
 */
export type Context = {};
