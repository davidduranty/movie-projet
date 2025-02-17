import { Test, TestingModule } from '@nestjs/testing';
import { ActorService } from './actor.service';
import { Actor } from 'backend/src/entities/actor.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

describe('ActorService', () => {
  let service: ActorService;
  let actorRepository: EntityRepository<Actor>;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forFeature([Actor])],
      providers: [ActorService],
    }).compile();

    service = module.get<ActorService>(ActorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
