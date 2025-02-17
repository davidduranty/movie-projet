import { Test, TestingModule } from '@nestjs/testing';

import { MovieController } from '../../controllers/movie/movie.controller';
import { MovieService } from './movie.service';
import { Movie } from '../../entities/movie.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

const mockMovieRepository = {
  find: jest.fn(),
};

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: EntityRepository<Movie>;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieService,
        {
          provide: EntityRepository,
          useValue: mockMovieRepository,
        },
        {
          provide: EntityManager,
          useValue: {
            persistAndFlush: jest.fn(),
            removeAndFlush: jest.fn(),
          },
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    movieRepository = module.get<EntityRepository<Movie>>(EntityRepository);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(MovieService).toBeDefined();
  });
});
