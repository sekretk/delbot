import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { RobotDto, RobotListDto } from '@delbot/shared';
import { RobotService } from '../services/robot.service';

@ApiTags('robots')
@Controller('robots')
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Get()
  @ApiOperation({ summary: 'Get all robots' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns list of all robots with their status',
    type: 'array'
  })
  getRobots(): RobotListDto {
    return this.robotService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get robot by ID' })
  @ApiParam({ name: 'id', description: 'Robot ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns robot information',
    type: 'object'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Robot not found' 
  })
  getRobot(@Param('id') id: string): RobotDto {
    const robot = this.robotService.findById(id);
    if (!robot) {
      throw new NotFoundException(`Robot with ID ${id} not found`);
    }
    return robot;
  }
}










