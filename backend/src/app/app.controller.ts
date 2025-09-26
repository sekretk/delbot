import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppDataDto, HealthResponseDto } from '@delbot/shared';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get application data' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns application data',
    type: 'object'
  })
  getData(): AppDataDto {
    return this.appService.getData();
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns health status',
    type: 'object'
  })
  getHealth(): HealthResponseDto {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}