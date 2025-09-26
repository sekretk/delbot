import { Injectable } from '@nestjs/common';
import { PointDto } from '@delbot/shared';

@Injectable()
export class PointsService {
  // Mock data - in real app this would come from database
  private points: PointDto[] = [
    {
      id: 'point-1',
      name: 'Main Office',
    },
    {
      id: 'point-2',
      name: 'Warehouse A',
    },
    {
      id: 'point-3',
      name: 'Customer Location Alpha',
    },
    {
      id: 'point-4',
      name: 'Customer Location Beta',
    },
  ];

  findAll(): PointDto[] {
    return this.points;
  }

  findOne(id: string): PointDto | undefined {
    return this.points.find(point => point.id === id);
  }
}










