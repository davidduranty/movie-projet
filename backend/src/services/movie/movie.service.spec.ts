import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { EntityManager, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { Movie } from '../../entities/movie.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '../../utils/http-status';

const mockMovieRepository = {
  find: jest.fn(),
  nativeDelete: jest.fn(),
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
          useValue: mockMovieRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
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

  describe('getAll', () => {
    it('should get all movies', async () => {
      //Arrange
      const mockMovies = [
        { id: 1, title: 'Scream', date: '2010-02-05', genre: 'Horreur' },
        { id: 2, title: 'lui', date: '2010-02-06', genre: 'Comédie' },
      ];
      mockMovieRepository.find.mockResolvedValue(mockMovies);
      //Act
      const result = await movieService.getAll();
      //Assert
      expect(result).toEqual(mockMovies);
      expect(mockMovieRepository.find).toHaveBeenCalledWith(
        {
          id: 1,
        },
        expect.any(Object),
      );
    });
  });
  describe('getMoviesByDateRange', () => {
    it('should get a movie without date', async () => {
      //Arrange
      const mockMovie = {
        title: 'Scream',
        date: new Date('2000-02-02'),
        genre: 'Horreur',
        actor: [], // Assurez-vous que ces relations sont bien gérées
        productor: []
      };
      mockMovieRepository.find.mockResolvedValue([mockMovie]);
      //Act
      const result = await movieService.getMoviesByDateRange();
      //Assert
      expect(result).toEqual([mockMovie]);
      expect(mockMovieRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({}),
        expect.objectContaining({
          strategy: "select-in",
          limit: 10,
          offset: 0,
          orderBy: { id: "ASC" },
          populate: expect.arrayContaining(["actor"]),
        })
      );
    });
    it('should get a movie by date range', async () => {
      //Arrange
      const mockMovie = {
        title: 'Scream',
        date: new Date('2000-02-02'),
        genre: 'Horreur',
      };
      const startDate = new Date('2000-01-01');
      const endDate = new Date('2025-01-01');
      mockMovieRepository.find.mockResolvedValue([mockMovie]);
      //Act
      const result = await movieService.getMoviesByDateRange(
        startDate,
        endDate,
      );
      //Assert
      expect(result).toEqual([mockMovie]);
      expect(mockMovieRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          date: { $gte: startDate, $lte: endDate }
        }),
        expect.objectContaining({
          strategy: "select-in",
          limit: 10,
          offset: 0,
          orderBy: { id: "ASC" },
          populate: expect.arrayContaining(["actor"]),
        })
      );
    });
    it('should get a movie with only date start', async () => {
      //Arrange
      const mockMovie = {
        title: 'Scream',
        date: new Date('2000-02-02'),
        genre: 'Horreur',
      };
      const startDate = new Date('2000-01-01');
      mockMovieRepository.find.mockResolvedValue([mockMovie]);
      //Act
      const result = await movieService.getMoviesByDateRange(startDate);
      //Assert
      expect(result).toEqual([mockMovie]);
      expect(mockMovieRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          date: expect.objectContaining({
            $gte: startDate,
          }),
        }),
        expect.objectContaining({
          strategy: "select-in",
          limit: 10,
          offset: 0,
          orderBy: { id: "ASC" },
          populate: expect.arrayContaining(["actor"]),
        })
      );
    });
    it('should get a movie with only date end', async () => {
      //Arrange
      const mockMovie = {
        title: 'Scream',
        date: new Date('2000-02-02'),
        genre: 'Horreur',
      };

      const endDate = new Date('2002-01-01');
      mockMovieRepository.find.mockResolvedValue([mockMovie]);
      //Act
      const result = await movieService.getMoviesByDateRange(undefined, endDate);
      //Assert
      expect(result).toEqual([mockMovie]);
      expect(mockMovieRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          date: expect.objectContaining({
            $lte: endDate,
          }),
        }),
        expect.objectContaining({
          strategy: "select-in",
          limit: 10,
          offset: 0,
          orderBy: { id: "ASC" },
          populate: expect.arrayContaining(["actor"]),
        })
      );
    });
    it('should no movies found', async () => {
      //Arrange
      mockMovieRepository.find.mockResolvedValue([]);
      //Act
      const result = await movieService.getMoviesByDateRange();
      //Assert
      expect(result).toEqual([]);
      expect(mockMovieRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          date: expect.objectContaining(
            {}),
        }),
        expect.objectContaining({
          strategy: "select-in",
          limit: 10,
          offset: 0,
          orderBy: { id: "ASC" },
          populate: expect.arrayContaining(["actor"]),
        })
      );
    });
  });
  describe('removeId', () => {
    it('should delete a movie by id', async () => {
      //Arrange
      mockMovieRepository.nativeDelete.mockResolvedValue(1);

      //Act
      const result = await movieService.removeId(1);
      // Assert
      expect(result).toBe(true);
      expect(mockMovieRepository.nativeDelete).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
