import { Controller, Get } from '@nestjs/common';
import { MovieService } from '../services/movie.service';


@Controller()
class MovieController {
  constructor(private readonly movieService: MovieService) {}
ervice
  @Get()
  getHello(): string {
    return this.movieService.getHello();
  }
}

export {MovieController}
