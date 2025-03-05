import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from '../../services/movie/movie.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MovieDto } from '../../models/movie.dto';

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
  describe('healthCheck', () => {
    it('should Ready if server is ready', async () => {
      //Act
      const result = movieController.healthCheck();
      //Assert
      expect(result).toBe('ready')
    })
  })
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
      //Act && Assert
      await expect(movieController.get(0)).rejects.toThrow(NotFoundException);
      expect(mockMovieService.getById).toHaveBeenCalledWith(0)
    })
  })

  describe('getMoviesByDate', () => {
    it('should Movies by release date range', async () => {
      //Arrange
      const mockMovie = {
        id: 1,
        title: 'Scream',
        date: new Date('2000-02-02')
      }
      const startDate = new Date('2000-01-01');
      const endDate = new Date('2025-01-01');
      mockMovieService.getMoviesByDateRange.mockReturnValue([mockMovie]);
      //Act
      const result = await movieController.getMoviesByDate(startDate, endDate)
      //Assert
      expect(result).toEqual([mockMovie])
      expect(mockMovieService.getMoviesByDateRange).toHaveBeenCalledWith(new Date(startDate), new Date(endDate))
    })
    it('should get a movie with only date start', async () => {
      //Arrange
      const mockMovie = {
        id: 1,
        title: 'Scream',
        date: new Date('2000-02-02')
      }
      const startDate = new Date('2000-01-01');
      const endDate = null;
      mockMovieService.getMoviesByDateRange.mockReturnValue([mockMovie]);
      //Act
      const result = await movieController.getMoviesByDate(startDate, endDate)
      //Assert
      expect(result).toEqual([mockMovie]);
      expect(mockMovieService.getMoviesByDateRange).toHaveBeenCalledWith(new Date(startDate), null)
    })
    it('should get a movie with only date end', async () => {
      //Arrange
      const mockMovie = {
        id: 1,
        title: 'Scream',
        date: new Date('2000-02-02')
      }

      const startDate = null;
      const endDate = new Date('2020-01-01');
      mockMovieService.getMoviesByDateRange.mockReturnValue([mockMovie]);
      //Act
      const result = await movieController.getMoviesByDate(startDate, endDate)
      //Assert
      expect(result).toEqual([mockMovie]);
      expect(mockMovieService.getMoviesByDateRange).toHaveBeenCalledWith(null, new Date(endDate))
    })
    it('should get a movie with no date found', async () => {
      //Arrange
      const mockMovie = {
        id: 1,
        title: 'Scream',
        date: new Date('2000-02-02')
      }

      const startDate = null;
      const endDate = null;
      mockMovieService.getMoviesByDateRange.mockReturnValue([mockMovie]);
      //Act
      const result = await movieController.getMoviesByDate(startDate, endDate)
      //Assert
      expect(result).toEqual([mockMovie]);
      expect(mockMovieService.getMoviesByDateRange).toHaveBeenCalledWith(null, null)
    })
    it('should startDate is a BadRequestException', async () => {
      //Arrange
      const mockMovie = {
        id: 1,
        title: 'Scream',
        date: new Date('2000-02-02')
      }
      const invalidStartDate = new Date('invalid-date');
      const endDate = new Date('2020-01-01');
      mockMovieService.getMoviesByDateRange.mockReturnValue([mockMovie]);
      //Act && Assert
      await expect(movieController.getMoviesByDate(invalidStartDate, endDate)).rejects.toThrow(BadRequestException)
      expect(mockMovieService.getMoviesByDateRange).not.toHaveBeenCalledWith()
    })
    it('should endDate is a BadRequestException', async () => {
      //Arrange
      const mockMovie = {
        id: 1,
        title: 'Scream',
        date: new Date('2000-02-02')
      }
      const startDate = new Date('2000-01-01');
      const invalidEndDate = new Date('invalid-date');
      mockMovieService.getMoviesByDateRange.mockReturnValue([mockMovie]);
      //Act && Assert
      await expect(movieController.getMoviesByDate(startDate, invalidEndDate)).rejects.toThrow(BadRequestException)
      expect(mockMovieService.getMoviesByDateRange).not.toHaveBeenCalledWith()
    })
    it('should all dates is a BadRequestException', async () => {
      //Arrange
      const mockMovie = {
        id: 1,
        title: 'Scream',
        date: new Date('2000-02-02')
      }
      const invalidStartDate = new Date('invalid-date');
      const invalidEndDate = new Date('invalid-date');
      mockMovieService.getMoviesByDateRange.mockReturnValue([mockMovie]);
      //Act && Assert
      await expect(movieController.getMoviesByDate(invalidStartDate, invalidEndDate)).rejects.toThrow(BadRequestException)
      expect(mockMovieService.getMoviesByDateRange).not.toHaveBeenCalledWith()
    })
    // })
    // describe('addMovie', () => {
    //   it('should A movie add', async () => {
    //     //Arrange
    //     const mockAddMovie: MovieDto = {
    //       title: 'Scream',
    //       date: new Date('2010-02-06'),
    //       genre: 'Horreur'
    //     }
    //     mockMovieService.post.mockReturnValue(mockAddMovie)
    //     //Act
    //     const result = await movieController.addMovie({ movieDto: mockAddMovie })
    //     //Assert
    //     expect(result).toEqual(mockAddMovie);
    //     expect(mockMovieService.post).toHaveBeenCalledWith(mockAddMovie)
    //   })
    // })
    describe('removeId', () => {
      it('should Delete a movie by id', async () => {
        //Arrange
        mockMovieService.removeId.mockReturnValue(true);
        //Act
        const result = await movieController.removeId(1);
        //Assert
        expect(result).toBeUndefined();
        expect(mockMovieService.removeId).toHaveBeenCalledWith(1);
      })
      it('should no movie found for delete', async () => {
        //Arrange
        mockMovieService.removeId.mockReturnValue(0)
        //Act && Assert
        await expect(movieController.removeId(0)).rejects.toThrow(Error);
        expect(mockMovieService.removeId).toHaveBeenCalledWith(0)
      })
    })

  });
