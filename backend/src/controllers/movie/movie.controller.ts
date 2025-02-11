import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from '../../services/movie/movie.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '../../utils/http-status';
import { Movie } from '../../entities/movie.entity';

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
  : Promise<Movie[]> {
    // const date = dateString ? new Date(dateString) : null;
    return await this._movieService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a movie by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A movie by id',
  })
  public async get(@Param('id') id: number): Promise<Movie[]> {
    return await this._movieService.get(id);
  }
}

export { MovieController };
