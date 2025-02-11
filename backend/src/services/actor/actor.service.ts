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
import { ProductorDto } from 'backend/src/models/productor.dto';
import { Productor } from 'backend/src/entities/productor.entity';

@Injectable()
class ActorService {
  public constructor(
    @InjectRepository(Actor)
    private readonly _actorService: EntityRepository<Actor>,
    @InjectRepository(Productor)
    private readonly _productorService: EntityRepository<Productor>,
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

  public async post(
    actorDto: ActorDto,
    productorDto: ProductorDto,
  ): Promise<Actor> {
    const addActor = new Actor();
    addActor.lastname = actorDto.lastname;
    addActor.firstname = actorDto.firstname;
    addActor.country = actorDto.country;

    if (actorDto.start) actorDto.start = actorDto.start;
    if (actorDto.end) actorDto.end = actorDto.end;

    if (actorDto.productorId) {
      const productor = await this._productorService.findOne(
        actorDto.productorId,
      );
      if (!productor) {
        throw new Error('Productor not found');
      }
      addActor.productor = productor;
    } else {
      const existingProductor = await this._productorService.findOne({
        lastname: productorDto.lastname,
        firstname: productorDto.firstname,
      });

      if (existingProductor) {
        addActor.productor = existingProductor;
      } else {
        const newProductor = new Productor();
        newProductor.lastname = productorDto.lastname;
        newProductor.firstname = productorDto.firstname;
        if (productorDto.age !== undefined) {
          newProductor.age = productorDto.age;
        }
        newProductor.now = newProductor.now ? true : false;

        await this._em.persistAndFlush(newProductor);

        addActor.productor = newProductor;
      }
    }

    this._em.persistAndFlush(addActor);

    return addActor;
  }
}

export { ActorService };
