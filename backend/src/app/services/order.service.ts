import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderDto, OrderStatus, CreateOrderRequestDto } from '@delbot/shared';
import { RobotService } from './robot.service';
import { PointService } from './point.service';

@Injectable()
export class OrderService {
  private orders: OrderDto[] = [];
  private orderCounter = 1;

  constructor(
    private robotService: RobotService,
    private pointService: PointService
  ) {
    // Initialize with some sample orders
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    const sampleOrders = [
      {
        fromPointId: 'point-001',
        toPointId: 'point-002',
        robotId: 'robot-002',
      },
      {
        fromPointId: 'point-003',
        toPointId: 'point-005',
        robotId: 'robot-005',
      },
    ];

    sampleOrders.forEach(orderReq => {
      try {
        this.create(orderReq);
      } catch (error) {
        // Ignore initialization errors
      }
    });
  }

  findAll(): OrderDto[] {
    return this.orders;
  }

  findById(id: string): OrderDto | undefined {
    return this.orders.find(order => order.id === id);
  }

  create(createOrderRequest: CreateOrderRequestDto): OrderDto {
    const { fromPointId, toPointId, robotId } = createOrderRequest;

    // Validate points exist
    const fromPoint = this.pointService.findById(fromPointId);
    const toPoint = this.pointService.findById(toPointId);
    const robot = this.robotService.findById(robotId);

    if (!fromPoint) {
      throw new NotFoundException(`From point with ID ${fromPointId} not found`);
    }

    if (!toPoint) {
      throw new NotFoundException(`To point with ID ${toPointId} not found`);
    }

    if (!robot) {
      throw new NotFoundException(`Robot with ID ${robotId} not found`);
    }

    // Validate robot is available
    if (robot.status !== 'Idle') {
      throw new BadRequestException(`Robot ${robotId} is not available (status: ${robot.status})`);
    }

    // Create new order
    const newOrder: OrderDto = {
      id: `order-${String(this.orderCounter).padStart(3, '0')}`,
      from: fromPoint,
      to: toPoint,
      robot: robot,
      createDate: new Date().toISOString(),
      status: 'InProgress' as OrderStatus,
    };

    this.orderCounter++;
    this.orders.push(newOrder);

    // Update robot status to OnRoute
    this.robotService.updateStatus(robotId, 'OnRoute');

    return newOrder;
  }

  updateStatus(id: string, status: OrderStatus): OrderDto | undefined {
    const order = this.findById(id);
    if (order) {
      const oldStatus = order.status;
      order.status = status;

      // If order is completed, make robot available
      if (status === 'Complete' && oldStatus === 'InProgress') {
        this.robotService.updateStatus(order.robot.id, 'Idle');
      }
    }
    return order;
  }
}










