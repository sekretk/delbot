import { Injectable } from '@nestjs/common';
import { TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { INestApplication } from '@nestjs/common';
import { router, publicProcedure } from '@delbot/shared';
import { AppService } from '../app/app.service';
import { OrderService } from '../app/services/order.service';
import { RobotService } from '../app/services/robot.service';
import { 
  AppDataSchema, 
  HealthResponseSchema,
  OrderSchema,
  CreateOrderSchema,
  RobotSchema 
} from '@delbot/shared';
import { z } from 'zod';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly appService: AppService,
    private readonly orderService: OrderService,
    private readonly robotService: RobotService,
  ) {}

  createRouter() {
    return router({
      app: router({
        getData: publicProcedure
          .input(z.void())
          .output(AppDataSchema)
          .query(async () => {
            return this.appService.getData();
          }),

        getHealth: publicProcedure
          .input(z.void())
          .output(HealthResponseSchema)
          .query(async () => {
            return this.appService.getHealth();
          }),
      }),

      orders: router({
        getOrders: publicProcedure
          .input(z.void())
          .output(z.array(OrderSchema))
          .query(async () => {
            return this.orderService.findAll();
          }),

        getOrderById: publicProcedure
          .input(z.object({ id: z.string() }))
          .output(OrderSchema)
          .query(async ({ input }) => {
            const order = this.orderService.findById(input.id);
            if (!order) {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: `Order with id ${input.id} not found`,
              });
            }
            return order;
          }),

        createOrder: publicProcedure
          .input(CreateOrderSchema)
          .output(OrderSchema)
          .mutation(async ({ input }) => {
            try {
              return this.orderService.create(input);
            } catch (error) {
              throw new TRPCError({
                code: 'BAD_REQUEST',
                message: error.message,
              });
            }
          }),
      }),

      robots: router({
        getRobots: publicProcedure
          .input(z.void())
          .output(z.array(RobotSchema))
          .query(async () => {
            return this.robotService.findAll();
          }),

        getRobotById: publicProcedure
          .input(z.object({ id: z.string() }))
          .output(RobotSchema)
          .query(async ({ input }) => {
            const robot = this.robotService.findById(input.id);
            if (!robot) {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: `Robot with id ${input.id} not found`,
              });
            }
            return robot;
          }),
      }),
    });
  }

  applyMiddleware(app: INestApplication) {
    const appRouter = this.createRouter();
    
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: () => ({}),
      })
    );
  }
}

export type AppRouter = ReturnType<TrpcRouter['createRouter']>;
