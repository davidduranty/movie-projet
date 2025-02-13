import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Actor } from 'backend/src/entities/actor.entity';
import { ActorDto } from 'backend/src/models/actor.dto';
import { ProductorDto } from 'backend/src/models/productor.dto';
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

  @Get()
  @ApiOperation({
    summary: 'Get a actor by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A actor by id',
  })
  public async get(@Query('id') id: number): Promise<Actor[]> {
    return await this._actorService.getById(id);
  }

  @Post('add-actor')
  @ApiOperation({
    summary: 'Add a new actor',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New actor added',
  })
  public async create(
    @Body() data: { actorDto: ActorDto; productorDto: ProductorDto },
  ) {
    const { actorDto, productorDto } = data;
    return await this._actorService.post(actorDto, productorDto);
  }
  @Get('country')
  @ApiOperation({
    summary: 'Search a actor vy country',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Edit actor with country filter',
  })
  public async getCountry(@Query('country') country: string): Promise<Actor[]> {
    return await this._actorService.getByCountry(country);
  }
}

export { ActorController };
