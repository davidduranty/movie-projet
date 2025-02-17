import { Test, TestingModule } from '@nestjs/testing';

import { MovieController } from '../../controllers/movie/movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let movieController: MovieController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
    }).compile();

    movieController = app.get<MovieController>(MovieController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
