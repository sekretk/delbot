import { Injectable } from '@nestjs/common';
import { PointDto } from '@delbot/shared';

@Injectable()
export class PointService {
  private points: PointDto[] = [
    { id: 'point-001', name: 'Main Entrance' },
    { id: 'point-002', name: 'Reception Desk' },
    { id: 'point-003', name: 'Conference Room A' },
    { id: 'point-004', name: 'Conference Room B' },
    { id: 'point-005', name: 'Kitchen' },
    { id: 'point-006', name: 'IT Department' },
    { id: 'point-007', name: 'Executive Office' },
    { id: 'point-008', name: 'Storage Room' },
  ];

  findAll(): PointDto[] {
    return this.points;
  }

  findById(id: string): PointDto | undefined {
    return this.points.find(point => point.id === id);
  }
}










