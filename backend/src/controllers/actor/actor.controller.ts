import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Actor } from 'backend/src/entities/actor.entity';
import { ActorService } from 'backend/src/services/actor/actor.service';

@Controller('actors')
class ActorController {
  constructor(public readonly _actorService: ActorService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Getting all Actor',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All actors',
  })
  public async getAllActor(): Promise<Actor[]> {
    return await this._actorService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a actor by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A actor by id',
  })
  public async get(@Param('id') id: number): Promise<Actor[]> {
    return await this._actorService.get(id);
  }
}

export { ActorController };
