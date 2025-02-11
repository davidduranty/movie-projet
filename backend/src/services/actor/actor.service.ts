import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityRepository, LoadStrategy } from '@mikro-orm/core';
import { Actor } from 'backend/src/entities/actor.entity';

@Injectable()
class ActorService {
  public constructor(
    @InjectRepository(Actor)
    private readonly _actorService: EntityRepository<Actor>,
  ) {}

  public async getAll(): Promise<Actor[]> {
    const actors = await this._actorService.find(
      {},
      {
        strategy: LoadStrategy.SELECT_IN,
      },
    );
    return actors;
  }

  public async get(id: number): Promise<Actor[]> {
    const actors = await this._actorService.find(
      { id: id },
      {
        strategy: LoadStrategy.SELECT_IN,
        limit: 10,
        offset: 0,
        orderBy: { id: 'ASC' },
      },
    );
    return actors;
  }
}

export { ActorService };
