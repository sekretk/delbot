import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderDto, CreateOrderDto } from '@delbot/shared';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns a list of all orders with their current status',
    type: 'array'
  })
  getAllOrders(): OrderDto[] {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns detailed information about a specific order',
    type: 'object'
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  getOrderById(@Param('id') id: string): OrderDto {
    const order = this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @Post()
  @ApiBody({ type: 'object', description: 'Order creation data' })
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({ 
    status: 201, 
    description: 'Order created successfully',
    type: 'object'
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid data or robot not available' })
  @ApiResponse({ status: 404, description: 'Point or robot not found' })
  createOrder(@Body() createOrderDto: CreateOrderDto): OrderDto {
    return this.ordersService.create(createOrderDto);
  }
}










