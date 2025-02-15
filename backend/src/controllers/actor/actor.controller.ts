import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
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

  @Get(':id')
  @ApiOperation({
    summary: 'Get a actor by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A actor by id',
  })
  public async get(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<ActorDto[]> {
    const result = await this._actorService.getById(id);
    if (!result) {
      throw new Error(`Actor ${HttpStatus.NOT_FOUND}`);
    }
    return result;
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
    @Body(new ValidationPipe())
    data: {
      actorDto: ActorDto;
      productorDto: ProductorDto;
    },
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
  public async getCountry(
    @Query('country') country: string,
  ): Promise<ActorDto[]> {
    return await this._actorService.getByCountry(country);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a actor by name',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A actor by name',
  })
  public async getName(@Query('name') name: string): Promise<ActorDto[]> {
    return await this._actorService.getByName(name);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a actor by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A actor delete by id',
  })
  public async removeId(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<void> {
    const actor = await this._actorService.removeId(id);
    if (!actor) {
      throw new Error(`Actor ${HttpStatus.NOT_FOUND}`);
    }
  }
}

export { ActorController };
