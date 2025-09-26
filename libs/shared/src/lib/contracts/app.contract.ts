import { initContract } from '@ts-rest/core';
import { AppDataDto, HealthResponseDto } from '../dto/app-data.dto';

const c = initContract();

export const appContract = c.router({
  getData: {
    method: 'GET',
    path: '/api',
    responses: {
      200: c.type<AppDataDto>(),
    },
    summary: 'Get application data',
    description: 'Returns application data from the service',
  },
  getHealth: {
    method: 'GET',
    path: '/api/health',
    responses: {
      200: c.type<HealthResponseDto>(),
    },
    summary: 'Health check endpoint',
    description: 'Returns the current health status and timestamp',
  },
});

export type AppContract = typeof appContract;
