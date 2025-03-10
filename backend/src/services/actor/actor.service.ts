import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  EntityManager,
  EntityRepository,
  FilterQuery,
  LoadStrategy,
  QueryOrder,
} from '@mikro-orm/core';
import { Actor } from '../../entities/actor.entity';
import { ActorDto } from '../../models/actor.dto';
import { Productor } from '../../entities/productor.entity';

@Injectable()
class ActorService {
  public constructor(
    @InjectRepository(Actor)
    private readonly _actorService: EntityRepository<Actor>,
    @InjectRepository(Productor)
    private readonly _productorService: EntityRepository<Productor>,
    private readonly _em: EntityManager,
  ) { }

  public async getAll(): Promise<Actor[]> {
    const actors = await this._actorService.find(
      {},
      {
        populate: ['productor'],
        populateOrderBy: { productor: { id: QueryOrder.ASC } },
        strategy: LoadStrategy.SELECT_IN,
      },
    );
    if (!actors || actors.length === 0) {
      throw new HttpException('No actors found', HttpStatus.NOT_FOUND);
    }
    return actors;
  }

  public async getById(id: number): Promise<Actor> {
    const actors = await this._actorService.find(
      { id: id },
      {
        populate: ['productor', 'dataMovies'],
        populateOrderBy: { productor: { id: QueryOrder.ASC } },
        strategy: LoadStrategy.SELECT_IN,
      },
    );
    if (!actors || actors.length === 0) {
      throw new HttpException(`no actors found`, HttpStatus.NOT_FOUND);
    }
    return actors[0];
  }
  public async getByCountry(country?: string): Promise<ActorDto[]> {
    const filters: FilterQuery<Actor> = {};

    if (country && country.length > 0) {
      filters['country'] = { $ilike: `%${country}%` };
    }

    const actors = await this._actorService.find(filters, {
      populate: ['productor', 'dataMovies'],
      populateOrderBy: { productor: { id: QueryOrder.ASC } },
      strategy: LoadStrategy.SELECT_IN,
      limit: 10,
      offset: 0,
      orderBy: { id: 'ASC' },
    });
    if (!actors || actors.length === 0) {
      throw new HttpException('No actors found', HttpStatus.NOT_FOUND);
    }

    // Appliquer le filtre en mémoire si un pays est fourni
    // if (country) {
    //   return actors.filter((actor) => actor.country &&
    //  actor.country.includes(country));
    // }
    return actors;
  }

  public async getByName(lastname: string): Promise<ActorDto[]> {
    if (!lastname) {
      throw new HttpException('Lastname is required', HttpStatus.BAD_REQUEST);
    }

    const filterName = { lastname: { $ilike: `%${lastname}%` } };
    const actors = await this._actorService.find(filterName, {
      populate: ['productor', 'dataMovies'],
      populateOrderBy: { productor: { id: QueryOrder.ASC } },
      strategy: LoadStrategy.SELECT_IN,
      limit: 10,
      offset: 0,
      orderBy: { id: 'ASC' },
    });

    if (!actors || actors.length === 0) {
      throw new HttpException('No actors found', HttpStatus.NOT_FOUND);
    }
    return actors;
  }

  // public async post(
  //   actorDto: ActorDto,
  //   productorDto: ProductorDto,
  // ): Promise<ActorDto> {
  //   const addActor = new Actor();
  //   addActor.lastname = actorDto.lastname;
  //   addActor.firstname = actorDto.firstname;
  //   addActor.country = actorDto.country;

  //   actorDto.start = actorDto.start;
  //   actorDto.end = actorDto.end;

  //   if (actorDto.productorId) {
  //     const productor = await this._productorService.findOne(
  //       actorDto.productorId,
  //     );
  //     if (!productor) {
  //       throw new Error('Productor not found');
  //     }
  //     addActor.productor = productor;
  //   } else {
  //     const existingProductor = await this._productorService.findOne({
  //       lastname: productorDto.lastname,
  //       firstname: productorDto.firstname,
  //     });

  //     if (existingProductor) {
  //       addActor.productor = existingProductor;
  //     } else {
  //       const newProductor = new Productor();
  //       newProductor.lastname = productorDto.lastname;
  //       newProductor.firstname = productorDto.firstname;
  //       if (productorDto.age !== undefined) {
  //         newProductor.age = productorDto.age;
  //       }
  //       newProductor.now = newProductor.now ? true : false;

  //       await this._em.persistAndFlush(newProductor);

  //       addActor.productor = newProductor;
  //     }
  //   }

  //   this._em.persistAndFlush(addActor);

  //   return addActor;
  // }

  public async post(actorDto: ActorDto): Promise<ActorDto> {
    const addActor = new Actor();
    addActor.lastname = actorDto.lastname;
    addActor.firstname = actorDto.firstname;
    addActor.country = actorDto.country;
    addActor.start = actorDto.start ?? null;
    addActor.end = actorDto.end ?? null;
    await this._em.persistAndFlush(addActor);

    return addActor;
  }

  public async removeId(id: number): Promise<boolean> {
    const actor = await this._actorService.nativeDelete({ id });
    return actor > 0;
  }
}

export { ActorService };
