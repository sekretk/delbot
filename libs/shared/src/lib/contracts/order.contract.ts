import { initContract } from '@ts-rest/core';
import { OrderDto, CreateOrderDto } from '../dto/order.dto';

const c = initContract();

export const orderContract = c.router({
  getOrders: {
    method: 'GET',
    path: '/orders',
    responses: {
      200: c.type<OrderDto[]>(),
    },
    summary: 'Get all orders',
    description: 'Returns a list of all orders with their current status',
  },
  getOrderById: {
    method: 'GET',
    path: '/orders/:id',
    responses: {
      200: c.type<OrderDto>(),
      404: c.type<{ message: string }>(),
    },
    summary: 'Get order by ID',
    description: 'Returns detailed information about a specific order',
  },
  createOrder: {
    method: 'POST',
    path: '/orders',
    body: c.type<CreateOrderDto>(),
    responses: {
      201: c.type<OrderDto>(),
      400: c.type<{ message: string }>(),
      404: c.type<{ message: string }>(),
    },
    summary: 'Create new order',
    description: 'Creates a new delivery order with specified points and robot',
  },
});

export type OrderContract = typeof orderContract;