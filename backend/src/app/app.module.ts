import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotController } from './controllers/robot.controller';
import { OrderController } from './controllers/order.controller';
import { RobotService } from './services/robot.service';
import { PointService } from './services/point.service';
import { OrderService } from './services/order.service';
import { TrpcRouter } from '../trpc/trpc.router';

@Module({
  imports: [],
  controllers: [AppController, RobotController, OrderController],
  providers: [AppService, RobotService, PointService, OrderService, TrpcRouter],
})
export class AppModule {}
