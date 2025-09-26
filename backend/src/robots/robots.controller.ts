import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { RobotDto } from '@delbot/shared';
import { RobotsService } from './robots.service';

@ApiTags('robots')
@Controller('robots')
export class RobotsController {
  constructor(private readonly robotsService: RobotsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all robots' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns a list of all robots with their current status',
    type: 'array'
  })
  getAllRobots(): RobotDto[] {
    return this.robotsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Robot ID' })
  @ApiOperation({ summary: 'Get robot by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns detailed information about a specific robot',
    type: 'object'
  })
  @ApiResponse({ status: 404, description: 'Robot not found' })
  getRobotById(@Param('id') id: string): RobotDto {
    const robot = this.robotsService.findOne(id);
    if (!robot) {
      throw new NotFoundException(`Robot with ID ${id} not found`);
    }
    return robot;
  }
}










