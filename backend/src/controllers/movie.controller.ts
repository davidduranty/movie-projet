import { Controller, Get } from '@nestjs/common';
import { MovieService } from '../services/movie.service';


@Controller()
class MovieController {
  constructor(private readonly movieService: MovieService) {}

 
}

export {MovieController}
