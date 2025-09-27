import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { OrderSchema, CreateOrderSchema } from '../dto/order.dto';

const ErrorSchema = z.object({
  message: z.string(),
});

export const orderRouter = router({
  getOrders: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/orders',
        summary: 'Get all orders',
        description: 'Returns a list of all orders with their current status',
        tags: ['orders'],
      },
    })
    .input(z.void())
    .output(z.array(OrderSchema))
    .query(async () => {
      // This will be implemented in the backend
      throw new Error('Not implemented - backend will handle this');
    }),

  getOrderById: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/orders/{id}',
        summary: 'Get order by ID',
        description: 'Returns detailed information about a specific order',
        tags: ['orders'],
      },
    })
    .input(z.object({ id: z.string() }))
    .output(OrderSchema)
    .query(async ({ input }) => {
      // This will be implemented in the backend
      throw new Error('Not implemented - backend will handle this');
    }),

  createOrder: publicProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/orders',
        summary: 'Create new order',
        description: 'Creates a new delivery order with specified points and robot',
        tags: ['orders'],
      },
    })
    .input(CreateOrderSchema)
    .output(OrderSchema)
    .mutation(async ({ input }) => {
      // This will be implemented in the backend
      throw new Error('Not implemented - backend will handle this');
    }),
});

export type OrderRouter = typeof orderRouter;