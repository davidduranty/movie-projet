import { Test, TestingModule } from '@nestjs/testing';
import { ActorService } from './actor.service';
import { EntityManager } from '@mikro-orm/core';
import { Actor } from '../../entities/actor.entity';
import { Productor } from '../../entities/productor.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';

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
});
