import { z } from 'zod';

// Point entity schema
export const PointSchema = z.object({
  id: z.string().describe('Point unique identifier'),
  name: z.string().describe('Point name/description'),
});

export type PointDto = z.infer<typeof PointSchema>;