import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { EntityManager } from '@mikro-orm/core';
import { Movie } from '../../entities/movie.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '../../utils/http-status';

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
  describe('getById', () => {
    it('should get a movie by id', async () => {
      //Arrange
      const mockMovie = {
        id: 1,
        title: 'Indiana Jones',
        date: '1990-02-05',
        genre: 'Aventure',
      };
      mockMovieRepository.find.mockResolvedValue([mockMovie]);
      //Act
      const result = await movieService.getById(1);
      //Assert
      expect(result).toEqual([mockMovie]);
      expect(mockMovieRepository.find).toHaveBeenCalledWith(
        { id: 1 },
        expect.any(Object),
      );
    });
    it('should throw a NotFoundException if no movie is found', async () => {
      //Arrange
      mockMovieRepository.find.mockResolvedValue([]);
      //Act && Assert
      expect(movieService.getById(1)).rejects.toThrow(
        new HttpException(`no movies found`, HttpStatus.NOT_FOUND),
      );
    });
  });
});
