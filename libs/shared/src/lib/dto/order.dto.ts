import { z } from 'zod';
import { PointSchema } from './point.dto';
import { RobotSchema } from './robot.dto';

// Order status enum
export const OrderStatusSchema = z.enum(['Complete', 'InProgress']);

// Order entity schema
export const OrderSchema = z.object({
  id: z.string().describe('Order unique identifier'),
  from: PointSchema.describe('Source point'),
  to: PointSchema.describe('Destination point'),
  robot: RobotSchema.describe('Assigned robot'),
  createDate: z.string().datetime().describe('Order creation date'),
  status: OrderStatusSchema.describe('Current order status'),
});

// Create order request schema
export const CreateOrderSchema = z.object({
  fromPointId: z.string().describe('Source point ID'),
  toPointId: z.string().describe('Destination point ID'),
  robotId: z.string().describe('Assigned robot ID'),
});

export type OrderStatus = z.infer<typeof OrderStatusSchema>;
export type OrderDto = z.infer<typeof OrderSchema>;
export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;

// Alternate naming for backward compatibility
export type CreateOrderRequestDto = CreateOrderDto;