import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { AppDataSchema, HealthResponseSchema } from '../dto/app-data.dto';

export const appRouter = router({
  getData: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/api',
        summary: 'Get application data',
        description: 'Returns application data from the service',
        tags: ['app'],
      },
    })
    .input(z.void())
    .output(AppDataSchema)
    .query(async () => {
      // This will be implemented in the backend
      throw new Error('Not implemented - backend will handle this');
    }),

  getHealth: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/api/health',
        summary: 'Health check endpoint', 
        description: 'Returns the current health status and timestamp',
        tags: ['app'],
      },
    })
    .input(z.void())
    .output(HealthResponseSchema)
    .query(async () => {
      // This will be implemented in the backend
      throw new Error('Not implemented - backend will handle this');
    }),
});

export type AppRouter = typeof appRouter;
