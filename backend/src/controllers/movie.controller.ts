import { Controller, Get } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '../utils/http-status';

@Controller()
class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('health-check')
  @ApiOperation({
    summary: 'Check the health of the application',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Internal server error',
  })
  healthCheck() {
    return { status: 'ready' };
  }
}

export { MovieController };
