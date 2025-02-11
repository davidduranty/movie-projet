import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Actor } from 'backend/src/entities/actor.entity';
import { ActorDto } from 'backend/src/models/actor.dto';
import { ActorService } from 'backend/src/services/actor/actor.service';

@Controller('actors')
class ActorController {
  constructor(private readonly _actorService: ActorService) {}

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

  @Post('add-actor')
  @ApiOperation({
    summary: 'Add a new actor',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New actor added',
  })
  public async create(@Body() actorDto: ActorDto) {
    return await this._actorService.post(actorDto);
  }
}

export { ActorController };
