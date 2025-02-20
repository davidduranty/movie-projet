import { Test, TestingModule } from '@nestjs/testing';
import { ActorService } from './actor.service';
import { EntityManager } from '@mikro-orm/core';
import { Actor } from '../../entities/actor.entity';
import { Productor } from '../../entities/productor.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { HttpStatus } from '../../utils/http-status';
import { HttpException } from '@nestjs/common';

const mockActorRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  nativeDelete: jest.fn(),
};

const mockActorEntities = {
  persistAndFlush: jest.fn(),
};

const mockProductorRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  nativeDelete: jest.fn(),
};

describe('ActorService', () => {
  let actorService: ActorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorService,
        {
          provide: getRepositoryToken(Actor),
          useValue: mockActorRepository, // Fournir le mock pour le MovieRepository
        },
        {
          provide: getRepositoryToken(Productor),
          useValue: mockProductorRepository, // Fournir le mock pour le MovieRepository
        },
        {
          provide: EntityManager,
          useValue: mockActorEntities, // Si tu n'as pas besoin de mocks spécifiques pour EntityManager
        },
      ],
    }).compile();

    actorService = module.get<ActorService>(ActorService);
  });

  it('should be defined', () => {
    expect(actorService).toBeDefined();
  });
  describe('getAll', () => {
    it('should get all actors', async () => {
      //Arrange
      const mockActors = [
        {
          id: 1,
          lastname: 'Hanks',
          firstname: 'Tom',
          country: 'USA',
          start: '1975-02-05',
          end: null,
          productorId: 42,
          movieId: 100,
        },
        {
          id: 2,
          lastname: 'Doe',
          firstname: 'John',
          country: 'USA',
          start: '1975-02-06',
          end: null,
          productorId: 43,
          movieId: 101,
        },
      ];
      mockActorRepository.find.mockResolvedValue(mockActors);
      //Act
      const result = await actorService.getAll();
      //Assert
      expect(result).toEqual(mockActors);
      expect(mockActorRepository.find).toHaveBeenCalledWith(
        {},
        expect.any(Object),
      );
    });
    it('should get no actors', async () => {
      //Arrange
      mockActorRepository.find.mockResolvedValue([]);
      //Act && Assert
      expect(actorService.getAll()).rejects.toThrow(
        new HttpException(`No actors found`, HttpStatus.NOT_FOUND),
      );
    });
  });
  describe('getById', () => {
    it('should a actor by id', async () => {
      //Arrange
      const mockActor = {
        id: 1,
        lastname: 'Hanks',
        firstname: 'Tom',
        country: 'USA',
        start: '1975-02-05',
        end: null,
        productorId: 42,
        movieId: 100,
      };
      mockActorRepository.find.mockResolvedValue([mockActor]);
      //Act
      const result = await actorService.getById(1);
      //Assert
      expect(result).toEqual([mockActor]);
      expect(mockActorRepository.find).toHaveBeenCalledWith(
        { id: 1 },
        expect.any(Object),
      );
    });
    it('should throw a NotFoundException if no actor is found', async () => {
      //Arrange
      mockActorRepository.find.mockResolvedValue([]);
      // Act & Assert
      await expect(actorService.getById(1)).rejects.toThrow(HttpException);
      await expect(actorService.getById(1)).rejects.toThrow(
        new HttpException(`no actors found`, HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('getByCountry', () => {
    it('should return actors from a specific country', async () => {
      //Arrange
      const mockActors = [
        {
          id: 1,
          lastname: 'Hanks',
          firstname: 'Tom',
          country: 'USA',
          start: '1975-02-05',
          end: null,
          productorId: 42,
          movieId: 100,
        },
        {
          id: 2,
          lastname: 'Doe',
          firstname: 'John',
          country: 'USA',
          start: '1975-02-06',
          end: null,
          productorId: 43,
          movieId: 101,
        },
      ];
      mockActorRepository.find.mockResolvedValue(mockActors);
      //Act
      const result = await actorService.getByCountry('USA');
      //Assert
      expect(result).toEqual(mockActors);
      expect(mockActorRepository.find).toHaveBeenCalledWith(
        { country: { $ilike: '%USA%' } },
        expect.any(Object),
      );
    });
    it('should throw an error if no actors are found for the country', async () => {
      //Arrange
      mockActorRepository.find.mockResolvedValue([]);
      //Act && Assert
      await expect(actorService.getByCountry('USA')).rejects.toThrow(
        new HttpException('No actors found', HttpStatus.NOT_FOUND),
      );
    });
  });
  describe('getByName', () => {
    it('should a actor by name', async () => {
      //Arrange
      const mockNameActor = {
        id: 1,
        lastname: 'doe',
      };
      mockActorRepository.find.mockResolvedValue([mockNameActor]);
      //Act
      const result = await actorService.getByName('Doe');
      //Assert
      expect(result).toEqual([mockNameActor]);
      expect(mockActorRepository.find).toHaveBeenCalledWith(
        { lastname: { $ilike: '%Doe%' } },
        expect.any(Object),
      );
    });
    it('should throw a NotFoundException if no lastname is found ', async () => {
      //Arrange
      mockActorRepository.find.mockResolvedValue([]);
      //Act && Assert
      await expect(actorService.getByName('Doe')).rejects.toThrow(
        HttpException,
      );
      await expect(actorService.getByName('Doe')).rejects.toThrow(
        new HttpException(`No actors found`, HttpStatus.NOT_FOUND),
      );
    });
    it('should throw an error if no lastname is provided', async () => {
      await expect(actorService.getByName('')).rejects.toThrow(
        new HttpException('Lastname is required', HttpStatus.BAD_REQUEST),
      );

      await expect(actorService.getByName(undefined as any)).rejects.toThrow(
        new HttpException('Lastname is required', HttpStatus.BAD_REQUEST),
      );
    });
  });
  describe('removeId', () => {
    it('should remove a actor if actor found', async () => {
      //Arrange
      mockActorRepository.nativeDelete.mockResolvedValue(1);
      //Act
      const result = await actorService.removeId(1);
      //Assert
      expect(result).toBe(true);
      expect(mockActorRepository.nativeDelete).toHaveBeenCalledWith({ id: 1 });
    });
    it('should not remove a actor if not actor found', async () => {
      //Arrange

      mockActorRepository.nativeDelete.mockResolvedValue(0);
      //Act
      const result = await actorService.removeId(1);
      //Assert
      expect(result).toBe(false);
      expect(mockActorRepository.nativeDelete).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
