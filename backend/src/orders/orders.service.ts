import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { OrderDto, CreateOrderDto } from '@delbot/shared';
import { RobotsService } from '../robots/robots.service';
import { PointsService } from '../points/points.service';

@Injectable()
export class OrdersService {
  // Mock data - in real app this would come from database
  private orders: OrderDto[] = [
    {
      id: 'order-1',
      from: { id: 'point-1', name: 'Main Office' },
      to: { id: 'point-2', name: 'Warehouse A' },
      robot: { id: 'robot-1', name: 'Delivery Bot Alpha', status: 'OnRoute' },
      createDate: new Date('2024-01-01T10:00:00Z').toISOString(),
      status: 'InProgress',
    },
    {
      id: 'order-2',
      from: { id: 'point-2', name: 'Warehouse A' },
      to: { id: 'point-3', name: 'Customer Location Alpha' },
      robot: { id: 'robot-2', name: 'Delivery Bot Beta', status: 'Idle' },
      createDate: new Date('2024-01-01T09:00:00Z').toISOString(),
      status: 'Complete',
    },
  ];

  private nextOrderId = 3;

  constructor(
    private robotsService: RobotsService,
    private pointsService: PointsService,
  ) {}

  findAll(): OrderDto[] {
    return this.orders;
  }

  findOne(id: string): OrderDto | undefined {
    return this.orders.find(order => order.id === id);
  }

  create(createOrderDto: CreateOrderDto): OrderDto {
    // Validate from point exists
    const fromPoint = this.pointsService.findOne(createOrderDto.fromPointId);
    if (!fromPoint) {
      throw new NotFoundException(`From point with ID ${createOrderDto.fromPointId} not found`);
    }

    // Validate to point exists
    const toPoint = this.pointsService.findOne(createOrderDto.toPointId);
    if (!toPoint) {
      throw new NotFoundException(`To point with ID ${createOrderDto.toPointId} not found`);
    }

    // Validate robot exists
    const robot = this.robotsService.findOne(createOrderDto.robotId);
    if (!robot) {
      throw new NotFoundException(`Robot with ID ${createOrderDto.robotId} not found`);
    }

    // Check if robot is available
    if (robot.status !== 'Idle') {
      throw new BadRequestException(`Robot ${robot.name} is not available (status: ${robot.status})`);
    }

    // Create new order
    const newOrder: OrderDto = {
      id: `order-${this.nextOrderId++}`,
      from: fromPoint,
      to: toPoint,
      robot: { ...robot, status: 'OnRoute' }, // Update robot status to OnRoute
      createDate: new Date().toISOString(),
      status: 'InProgress',
    };

    // Add to orders list
    this.orders.push(newOrder);

    // Update robot status in robots service (in real app this would be handled by database transactions)
    robot.status = 'OnRoute';

    return newOrder;
  }
}










