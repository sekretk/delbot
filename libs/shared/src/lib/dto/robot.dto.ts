import { z } from 'zod';

// Robot status enum
export const RobotStatusSchema = z.enum(['OnRoute', 'InTrouble', 'Idle']);

// Robot entity schema
export const RobotSchema = z.object({
  id: z.string().describe('Robot unique identifier'),
  name: z.string().describe('Robot name'),
  status: RobotStatusSchema.describe('Current robot status'),
});

export type RobotStatus = z.infer<typeof RobotStatusSchema>;
export type RobotDto = z.infer<typeof RobotSchema>;

// Robot list response type (for backward compatibility)
export type RobotListDto = RobotDto[];