import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from '../../services/movie/movie.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '../../utils/http-status';
import { Movie } from '../../entities/movie.entity';
import { MovieDto } from 'backend/src/models/movie.dto';

@Controller('movies')
class MovieController {
  constructor(private readonly _movieService: MovieService) {}

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
  public async getAllMovies() // @Query('date') dateString?: string,
  : Promise<MovieDto[]> {
    // const date = dateString ? new Date(dateString) : null;
    return await this._movieService.getAll();
  }

  @Get('id/:id')
  @ApiOperation({
    summary: 'Get a movie by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A movie by id',
  })
  public async get(@Param('id') id: number): Promise<MovieDto[]> {
    return await this._movieService.getById(id);
  }

  @Get('filter-by-date')
  @ApiOperation({
    summary: 'Filter movies by release date range',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A movie add',
  })
  public async getMoviesByDate(
    @Query('start') start?: string,
    @Query('end') end?: string,
  ): Promise<MovieDto[]> {
    const startDate = start ? new Date(start) : undefined;
    const endDate = end ? new Date(end) : undefined;
    return await this._movieService.getMoviesByDateRange(startDate, endDate);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Movies within a date range',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A movie add',
  })
  public async addMovie(@Body() data: { movieDto: MovieDto }) {
    const { movieDto } = data;
    return await this._movieService.post(movieDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a movie by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A movie delete by id',
  })
  public async removeId(@Param('id') id: number): Promise<void> {
    await this._movieService.removeId(id);
  }
}

export { MovieController };
