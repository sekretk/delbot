import { initContract } from '@ts-rest/core';
import { RobotDto } from '../dto/robot.dto';

const c = initContract();

export const robotContract = c.router({
  getRobots: {
    method: 'GET',
    path: '/robots',
    responses: {
      200: c.type<RobotDto[]>(),
    },
    summary: 'Get all robots',
    description: 'Returns a list of all robots with their current status',
  },
  getRobotById: {
    method: 'GET',
    path: '/robots/:id',
    responses: {
      200: c.type<RobotDto>(),
      404: c.type<{ message: string }>(),
    },
    summary: 'Get robot by ID',
    description: 'Returns detailed information about a specific robot',
  },
});

export type RobotContract = typeof robotContract;