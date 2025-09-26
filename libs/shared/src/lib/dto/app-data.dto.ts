import { z } from 'zod';

// Zod schemas for validation
export const AppDataSchema = z.object({
  message: z.string().describe('The message from the app service'),
});

export const HealthResponseSchema = z.object({
  status: z.string().describe('The health status'),
  timestamp: z.string().describe('Timestamp when health check was performed'),
});

// TypeScript types derived from schemas
export type AppDataDto = z.infer<typeof AppDataSchema>;
export type HealthResponseDto = z.infer<typeof HealthResponseSchema>;










