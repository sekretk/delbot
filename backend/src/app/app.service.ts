import { Injectable } from '@nestjs/common';
import { AppDataDto } from '@delbot/shared';

@Injectable()
export class AppService {
  getData(): AppDataDto {
    return { message: 'Hello API' };
  }
}
