import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from '../../services/movie/movie.service';

const mockMovieService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  getMoviesByDateRange: jest.fn(),
  getByName: jest.fn(),
  post: jest.fn(),
  removeId: jest.fn(),
};

describe('MovieController', () => {
  let movieController: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService, // Remplace le service par son mock
          useValue: mockMovieService,
        },
      ],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(movieController).toBeDefined();
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
