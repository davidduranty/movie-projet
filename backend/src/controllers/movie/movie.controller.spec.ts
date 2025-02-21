import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from '../../services/movie/movie.service';
import { NotFoundException } from '@nestjs/common';

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
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(movieController).toBeDefined();
  });
  describe('getAllMovies', () => {
    it('should Getting all Movies', async () => {
      //Arrange
      const mockAllMovies = [
        { id: 1, title: 'Scream', date: '2010-02-05', genre: 'Horreur' },
        { id: 2, title: 'lui', date: '2010-02-06', genre: 'Comédie' },
      ];
      mockMovieService.getAll.mockReturnValue(mockAllMovies);
      //Act
      const result = await movieController.getAllMovies();
      //Assert
      expect(result).toEqual(mockAllMovies);
      expect(mockMovieService.getAll).toHaveBeenCalledWith();
    })
    it('should movie not found', async () => {
      //Arrange
      mockMovieService.getAll.mockReturnValue([])
      //Act && Assert
      await expect(movieController.getAllMovies()).rejects.toThrow(NotFoundException);
      expect(mockMovieService.getAll).toHaveBeenCalledWith()

    })
  })
  describe('getById', () => {
    it('should Get a movie by id', async () => {
      //Arrange
      const mockMovie = {
        id: 1,
        title: 'Scream'
      }
      mockMovieService.getById.mockReturnValue(mockMovie)
      //Act
      const result = await movieController.get(1)
      //Assert
      expect(result).toEqual(mockMovie);
      expect(mockMovieService.getById).toHaveBeenCalledWith(1)
    })
    it('should get a movie by id not found', async () => {
      //Arrange
      mockMovieService.getById.mockReturnValue(0);
      //Act
      //Assert
      await expect(movieController.get(0)).rejects.toThrow(NotFoundException);
      expect(mockMovieService.getById).toHaveBeenCalledWith(0)
    })
  })

});
