import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { RobotSchema } from '../dto/robot.dto';

const ErrorSchema = z.object({
  message: z.string(),
});

export const robotRouter = router({
  getRobots: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/robots',
        summary: 'Get all robots',
        description: 'Returns a list of all robots with their current status',
        tags: ['robots'],
      },
    })
    .input(z.void())
    .output(z.array(RobotSchema))
    .query(async () => {
      // This will be implemented in the backend
      throw new Error('Not implemented - backend will handle this');
    }),

  getRobotById: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/robots/{id}',
        summary: 'Get robot by ID',
        description: 'Returns detailed information about a specific robot',
        tags: ['robots'],
      },
    })
    .input(z.object({ id: z.string() }))
    .output(RobotSchema)
    .query(async ({ input }) => {
      // This will be implemented in the backend
      throw new Error('Not implemented - backend will handle this');
    }),
});

export type RobotRouter = typeof robotRouter;