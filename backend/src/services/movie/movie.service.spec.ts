import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { EntityManager } from '@mikro-orm/core';
import { Movie } from '../../entities/movie.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';

const mockMovieRepository = {
  find: jest.fn(),
  nativeDelete: jest.fn(),
  persistAndFlush: jest.fn(),
  // Ajoute d'autres méthodes que tu utilises dans MovieService, par exemple, `save`, `remove`, etc.
};

const mockEntityManager = {
  persistAndFlush: jest.fn(),
};
describe('MovieService', () => {
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieRepository, // Fournir le mock pour le MovieRepository
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager, // Si tu n'as pas besoin de mocks spécifiques pour EntityManager
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });
});
