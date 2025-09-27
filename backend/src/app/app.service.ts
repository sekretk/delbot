import { Injectable } from '@nestjs/common';
import { AppDataDto, HealthResponseDto } from '@delbot/shared';

@Injectable()
export class AppService {
  getData(): AppDataDto {
    return { message: 'Hello API' };
  }

  getHealth(): HealthResponseDto {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}
