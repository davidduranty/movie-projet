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
  persistAndFlush: jest.fn(),
};

const mockActorEntities = {
  persistAndFlush: jest.fn(),
};

const mockProductorRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  nativeDelete: jest.fn(),
  persistAndFlush: jest.fn(),
  // Ajoute d'autres méthodes que tu utilises dans ActorService
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
});
