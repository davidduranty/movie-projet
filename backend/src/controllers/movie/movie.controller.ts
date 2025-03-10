import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from '../../services/movie/movie.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '../../utils/http-status';
import { MovieDto } from '../../models/movie.dto';

@Controller('movies')
class MovieController {
  constructor(private readonly _movieService: MovieService) { }

  @Get('health-check')
  @ApiOperation({
    summary: 'Check the health of the application',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ready if server is ready',
  })
  healthCheck(): string {
    return 'ready';
  }

  @Get('all')
  @ApiOperation({
    summary: 'Getting all Movies',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All movies',
  })
  public async getAllMovies()
    : Promise<MovieDto[]> {
    const result = await this._movieService.getAll();
    if (!result || result.length === 0) {
      throw new NotFoundException('No movies found');
    }
    return result
  }
  @Get()
  @ApiOperation({
    summary: 'Get movie by title'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'filter movies'
  })
  public async getByTitle(@Query('title') title: string): Promise<MovieDto[]> {
    const result = await this._movieService.getByName(title);
    if (!result) {
      throw new NotFoundException('No movies found by title');
    }
    return result
  }

  @Get('id/:id')
  @ApiOperation({
    summary: 'Get a movie by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A movie by id',
  })
  public async get(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<MovieDto> {
    const result = await this._movieService.getById(id);
    if (!result) {
      throw new NotFoundException('No movies found');
    }
    return result;
  }

  @Get('filter-by-date')
  @ApiOperation({
    summary: 'Filter movies by release date range',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movies by release date range',
  })
  public async getMoviesByDate(
    @Query('start') start?: Date | null,
    @Query('end') end?: Date | null,
  ): Promise<MovieDto[]> {
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (start && startDate !== null && isNaN(startDate.getTime())) {
      throw new BadRequestException('Invalid start date format');
    }
    if (end && endDate !== null && isNaN(endDate.getTime())) {
      throw new BadRequestException('Invalid end date format');
    }
    return await this._movieService.getMoviesByDateRange(startDate, endDate);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Movies within a date range',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A movie add',
    type: MovieDto,
  })
  public async post(
    @Body(new ValidationPipe()) data: MovieDto
  ) {
    console.log('📥 Données reçues:', data);
    return await this._movieService.post(data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a movie by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A movie delete by id',
  })
  public async removeId(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<void> {
    const result = await this._movieService.removeId(id);
    if (!result) {
      throw new Error(`Movie ${HttpStatus.NOT_FOUND}`);
    }
  }
}

export { MovieController };
