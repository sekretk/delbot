import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderDto, CreateOrderRequestDto } from '@delbot/shared';
import { OrderService } from '../services/order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns list of all delivery orders',
    type: 'array'
  })
  getOrders(): OrderDto[] {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns order information',
    type: 'object'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Order not found' 
  })
  getOrder(@Param('id') id: string): OrderDto {
    const order = this.orderService.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  @ApiBody({ 
    description: 'Order creation request',
    type: 'object'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Order created successfully',
    type: 'object'
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid request data' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Point or robot not found' 
  })
  createOrder(@Body() createOrderRequest: CreateOrderRequestDto): OrderDto {
    return this.orderService.create(createOrderRequest);
  }
}
