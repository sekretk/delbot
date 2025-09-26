import { Injectable } from '@nestjs/common';
import { RobotDto } from '@delbot/shared';

@Injectable()
export class RobotsService {
  // Mock data - in real app this would come from database
  private robots: RobotDto[] = [
    {
      id: 'robot-1',
      name: 'Delivery Bot Alpha',
      status: 'Idle',
    },
    {
      id: 'robot-2',
      name: 'Delivery Bot Beta',
      status: 'OnRoute',
    },
    {
      id: 'robot-3',
      name: 'Delivery Bot Gamma',
      status: 'InTrouble',
    },
  ];

  findAll(): RobotDto[] {
    return this.robots;
  }

  findOne(id: string): RobotDto | undefined {
    return this.robots.find(robot => robot.id === id);
  }
}










