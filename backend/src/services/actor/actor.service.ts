import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  EntityRepository,
  LoadStrategy,
  QueryOrder,
} from '@mikro-orm/core';
import { Actor } from 'backend/src/entities/actor.entity';
import { ActorDto } from 'backend/src/models/actor.dto';

@Injectable()
class ActorService {
  public constructor(
    @InjectRepository(Actor)
    private readonly _actorService: EntityRepository<Actor>,
    private readonly _em: EntityManager,
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
        populate: ['productor', 'dataMovies'],
        populateOrderBy: { productor: { id: QueryOrder.ASC } },
        strategy: LoadStrategy.SELECT_IN,
        limit: 10,
        offset: 0,
        orderBy: { id: 'ASC' },
      },
    );
    return actors;
  }

  public async post(actorDto: ActorDto): Promise<Actor> {
    const addActor = new Actor();
    addActor.lastname = actorDto.lastname;
    addActor.firstname = actorDto.firstname;
    addActor.country = actorDto.country;

    if (actorDto.start) actorDto.start = actorDto.start;
    if (actorDto.end) actorDto.end = actorDto.end;

    this._em.persistAndFlush(addActor);

    return addActor;
  }
}

export { ActorService };
