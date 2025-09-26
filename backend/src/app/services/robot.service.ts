import { Injectable } from '@nestjs/common';
import { RobotDto, RobotStatus } from '@delbot/shared';

@Injectable()
export class RobotService {
  private robots: RobotDto[] = [
    { id: 'robot-001', name: 'Delivery Bot Alpha', status: 'Idle' as RobotStatus },
    { id: 'robot-002', name: 'Delivery Bot Beta', status: 'OnRoute' as RobotStatus },
    { id: 'robot-003', name: 'Delivery Bot Gamma', status: 'Idle' as RobotStatus },
    { id: 'robot-004', name: 'Delivery Bot Delta', status: 'InTrouble' as RobotStatus },
    { id: 'robot-005', name: 'Delivery Bot Epsilon', status: 'OnRoute' as RobotStatus },
  ];

  findAll(): RobotDto[] {
    return this.robots;
  }

  findById(id: string): RobotDto | undefined {
    return this.robots.find(robot => robot.id === id);
  }

  updateStatus(id: string, status: RobotStatus): RobotDto | undefined {
    const robot = this.findById(id);
    if (robot) {
      robot.status = status;
    }
    return robot;
  }

  getAvailableRobots(): RobotDto[] {
    return this.robots.filter(robot => robot.status === 'Idle');
  }
}
